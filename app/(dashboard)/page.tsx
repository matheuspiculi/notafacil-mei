"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, DollarSign, TrendingUp, Calendar } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface DashboardStats {
  notasEsteMes: number;
  faturamentoEsteMes: number;
  faturamentoTotal: number;
  ultimaNota: any;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    notasEsteMes: 0,
    faturamentoEsteMes: 0,
    faturamentoTotal: 0,
    ultimaNota: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarEstatisticas();
  }, []);

  const carregarEstatisticas = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const now = new Date();
      const primeiroDiaMes = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

      // Notas deste mês
      const { data: notasMes } = await supabase
        .from('notas_emitidas')
        .select('valor, emitted_at')
        .eq('user_id', user.id)
        .gte('emitted_at', primeiroDiaMes);

      // Todas as notas para total
      const { data: todasNotas } = await supabase
        .from('notas_emitidas')
        .select('valor, emitted_at, descricao, tipo')
        .eq('user_id', user.id)
        .order('emitted_at', { ascending: false })
        .limit(5);

      const faturamentoMes = notasMes?.reduce((sum, nota) => sum + Number(nota.valor), 0) || 0;
      const faturamentoTotal = todasNotas?.reduce((sum, nota) => sum + Number(nota.valor), 0) || 0;

      setStats({
        notasEsteMes: notasMes?.length || 0,
        faturamentoEsteMes: faturamentoMes,
        faturamentoTotal: faturamentoTotal,
        ultimaNota: todasNotas?.[0] || null
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-zinc-800 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => <div key={i} className="h-32 bg-zinc-800 rounded-2xl"></div>)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-5xl font-bold tracking-tight">Bem-vindo de volta!</h1>
        <p className="text-xl text-zinc-400 mt-2">Aqui está o resumo do seu mês</p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Notas Este Mês</CardTitle>
            <FileText className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stats.notasEsteMes}</div>
            <p className="text-xs text-green-500 mt-1">+{stats.notasEsteMes} desde o início do mês</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Faturamento Este Mês</CardTitle>
            <DollarSign className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{formatarValor(stats.faturamentoEsteMes)}</div>
            <p className="text-xs text-green-500 mt-1">Total deste mês</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Faturamento Total</CardTitle>
            <TrendingUp className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{formatarValor(stats.faturamentoTotal)}</div>
            <p className="text-xs text-zinc-400 mt-1">Desde o início</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Média por Nota</CardTitle>
            <Calendar className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {stats.notasEsteMes > 0 
                ? formatarValor(stats.faturamentoEsteMes / stats.notasEsteMes) 
                : 'R$ 0,00'}
            </div>
            <p className="text-xs text-zinc-400 mt-1">Média mensal</p>
          </CardContent>
        </Card>
      </div>

      {/* Últimas Notas */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Últimas Notas Emitidas</h2>
          <a href="/historico" className="text-sm text-blue-400 hover:underline">Ver todas →</a>
        </div>

        <div className="space-y-3">
          {stats.ultimaNota ? (
            <Card className="hover:shadow-lg transition-all">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <Badge variant={stats.ultimaNota.tipo === 'nfse' ? 'default' : 'secondary'}>
                      {stats.ultimaNota.tipo.toUpperCase()}
                    </Badge>
                    <span className="font-medium">{stats.ultimaNota.descricao}</span>
                  </div>
                  <p className="text-sm text-zinc-400 mt-1">
                    {new Intl.DateTimeFormat('pt-BR').format(new Date(stats.ultimaNota.emitted_at))}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-500">
                    {formatarValor(stats.ultimaNota.valor)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-zinc-400">Nenhuma nota emitida ainda.</p>
                <a href="/emitir" className="text-blue-400 hover:underline mt-2 inline-block">
                  Emitir primeira nota →
                </a>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}