-- ============================================
-- NOTAFACIL MEI - Tabelas para Usuários e Histórico
-- ============================================

-- 1. Perfil do MEI (extensão do usuário Supabase)
create table if not exists public.mei_profiles (
  id uuid references auth.users on delete cascade primary key,
  cnpj text unique not null,
  razao_social text not null,
  nome_fantasia text,
  telefone text,
  endereco jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Histórico de Notas Emitidas
create table if not exists public.notas_emitidas (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  tipo text check (tipo in ('nfse', 'nfe', 'nfce')) not null,
  chave_acesso text unique not null,
  numero_nota text,
  serie text default '1',
  valor numeric(12,2) not null,
  descricao text not null,
  tomador_cnpj text,
  tomador_nome text,
  pdf_url text,
  xml_url text,
  status text default 'autorizada' check (status in ('autorizada', 'cancelada', 'rejeitada')),
  emitted_at timestamptz default now(),
  created_at timestamptz default now()
);

-- 3. Índices para performance
create index if not exists idx_notas_user_id on public.notas_emitidas(user_id);
create index if not exists idx_notas_emitted_at on public.notas_emitidas(emitted_at desc);
create index if not exists idx_notas_tipo on public.notas_emitidas(tipo);

-- 4. Row Level Security (RLS)
alter table public.mei_profiles enable row level security;
alter table public.notas_emitidas enable row level security;

-- Políticas de segurança
create policy "Usuários podem ver apenas seu próprio perfil"
  on public.mei_profiles for select
  using (auth.uid() = id);

create policy "Usuários podem inserir seu próprio perfil"
  on public.mei_profiles for insert
  with check (auth.uid() = id);

create policy "Usuários podem ver apenas suas próprias notas"
  on public.notas_emitidas for select
  using (auth.uid() = user_id);

create policy "Usuários podem inserir suas próprias notas"
  on public.notas_emitidas for insert
  with check (auth.uid() = user_id);

create policy "Usuários podem atualizar suas próprias notas (cancelar)"
  on public.notas_emitidas for update
  using (auth.uid() = user_id);

-- 5. Função para atualizar updated_at automaticamente
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger mei_profiles_updated_at
  before update on public.mei_profiles
  for each row execute function public.handle_updated_at();