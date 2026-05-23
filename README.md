# NotaFácil MEI 🚀

**O emissor de notas fiscais mais simples para MEI**

Emita **NFS-e Nacional** e **NF-e/NFC-e** direto do seu navegador com integração real ao Supabase.

## ✨ Funcionalidades

- Login com Supabase Auth
- Configuração completa do MEI (CNPJ, razão social, endereço)
- Emissão de NFS-e e NF-e
- Histórico completo de notas emitidas
- Tudo salvo automaticamente no banco

## Como Usar

1. Configure o Supabase no seu projeto (já está parcialmente configurado)
2. Rode `npm run dev`
3. Acesse `/auth` para fazer login
4. Acesse `/configuracao` e preencha seus dados do MEI
5. Emita notas em `/emitir`
6. Veja o histórico em `/historico`

## Páginas Disponíveis

- `/configuracao` → Cadastro e edição dos dados do MEI
- `/emitir` → Emissão de notas
- `/historico` → Histórico de todas as notas emitidas

## Próximos Passos

- Integração com certificado digital A1
- Cancelamento de notas
- Envio automático por WhatsApp/Email

**Feito com Next.js + Supabase + Foco em simplicidade para MEIs.**