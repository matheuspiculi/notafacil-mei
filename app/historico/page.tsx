"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Eye } from 'lucide-react';

interface NotaEmitida {
  id: string;
  tipo: 'nfse' | 'nfe' | 'nfce';
  chave_acesso: string;
  numero_nota: string;
  valor: number;
  descricao: string;
  tomador_nome?: string;
  pdf_url?: string;
  status: string;
  emitted_at: string;
}

export default function HistoricoNotas() {
  const [notas, setNotas] = useState<NotaEmitida[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroTipo, setFiltroTipo] = useState<'todos' | 'nfse' | 'nfe'>('todos');

  useEffect(() => {
    carregarHistorico();
  }, []);

  const carregarHistorico = async () => {
    try {
      const res = await fetch('/api/fiscal/historico');
      const data = await res.json();
      setNotas(data.notas || []);
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    } finally {
      setLoading(false);
    }
  };

  const notasFiltradas = filtroTipo === 'todos' 
    ? notas 
    : notas.filter(n => n.tipo === filtroTipo);

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(valor);
  };

  const formatarData = (data: string) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(data));
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Histórico de Notas</h1>
          <p className="text-muted-foreground mt-2">Todas as notas fiscais emitidas por você</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant={filtroTipo === 'todos' ? 'default' : 'outline'}
            onClick={() => setFiltroTipo('todos')}
          >
            Todas
          </Button>
          <Button 
            variant={filtroTipo === 'nfse' ? 'default' : 'outline'}
            onClick={() => setFiltroTipo('nfse')}
          >
            NFS-e
          </Button>
          <Button 
            variant={filtroTipo === 'nfe' ? 'default' : 'outline'}
            onClick={() => setFiltroTipo('nfe')}
          >
            NF-e
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">Carregando histórico...</div>
      ) : notasFiltradas.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-lg text-muted-foreground">Nenhuma nota emitida ainda.</p>
            <Button className="mt-4" onClick={() => window.location.href = '/emitir'}>
              Emitir primeira nota
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {notasFiltradas.map((nota) => (
            <Card key={nota.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant={nota.tipo === 'nfse' ? 'default' : 'secondary'}>
                        {nota.tipo.toUpperCase()}
                      </Badge>
                      <span className="font-mono text-sm text-muted-foreground">
                        {nota.numero_nota || nota.chave_acesso?.slice(0, 20) + '...'}
                      </span>
                    </div>
                    
                    <h3 className="font-semibold text-lg">{nota.descricao}</h3>
                    
                    {nota.tomador_nome && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Cliente: {nota.tomador_nome}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <span className="font-medium text-green-600">
                        {formatarValor(nota.valor)}
                      </span>
                      <span className="text-muted-foreground">
                        {formatarData(nota.emitted_at)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {nota.pdf_url && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(nota.pdf_url, '_blank')}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        PDF
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => alert('Visualização completa em breve')}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Ver
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}