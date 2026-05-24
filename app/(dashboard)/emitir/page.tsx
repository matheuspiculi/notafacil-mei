"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function EmitirNota() {
  const [tipo, setTipo] = useState<'nfse' | 'nfe'>('nfse');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tomadorCnpj, setTomadorCnpj] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<any>(null);

  const handleEmitir = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/fiscal/emitir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo,
          valor: parseFloat(valor),
          descricao,
          tomadorCnpj,
        }),
      });

      const data = await res.json();
      setResultado(data);
    } catch (error) {
      alert('Erro ao emitir nota');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Emitir Nota Fiscal</h1>

      <div className="flex gap-4 mb-6">
        <Button 
          variant={tipo === 'nfse' ? 'default' : 'outline'} 
          onClick={() => setTipo('nfse')}
        >
          NFS-e (Serviço)
        </Button>
        <Button 
          variant={tipo === 'nfe' ? 'default' : 'outline'} 
          onClick={() => setTipo('nfe')}
        >
          NF-e (Venda)
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dados da Nota</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Valor (R$)</label>
            <Input 
              type="number" 
              value={valor} 
              onChange={(e) => setValor(e.target.value)} 
              placeholder="1500.00" 
            />
          </div>

          <div>
            <label className="text-sm font-medium">Descrição do Serviço / Produto</label>
            <Input 
              value={descricao} 
              onChange={(e) => setDescricao(e.target.value)} 
              placeholder="Desenvolvimento de site" 
            />
          </div>

          <div>
            <label className="text-sm font-medium">CNPJ do Tomador (Cliente)</label>
            <Input 
              value={tomadorCnpj} 
              onChange={(e) => setTomadorCnpj(e.target.value)} 
              placeholder="00.000.000/0001-00" 
            />
          </div>

          <Button 
            onClick={handleEmitir} 
            disabled={loading || !valor || !descricao}
            className="w-full mt-4"
          >
            {loading ? 'Emitindo...' : `Emitir ${tipo.toUpperCase()}`}
          </Button>
        </CardContent>
      </Card>

      {resultado && (
        <Card className="mt-6 border-green-500">
          <CardHeader>
            <CardTitle className="text-green-600">✅ Nota Emitida com Sucesso!</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Chave de Acesso:</strong> {resultado.chave}</p>
            <p><strong>PDF:</strong> <a href={resultado.pdf} target="_blank" className="text-blue-600 underline">Baixar DANFE</a></p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}