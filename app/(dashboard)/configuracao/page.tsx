"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function ConfiguracaoMEI() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [perfil, setPerfil] = useState({
    cnpj: '',
    razao_social: '',
    nome_fantasia: '',
    telefone: '',
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: ''
  });

  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/mei/perfil');
      if (res.ok) {
        const data = await res.json();
        if (data.perfil) {
          setPerfil({
            cnpj: data.perfil.cnpj || '',
            razao_social: data.perfil.razao_social || '',
            nome_fantasia: data.perfil.nome_fantasia || '',
            telefone: data.perfil.telefone || '',
            cep: data.perfil.endereco?.cep || '',
            rua: data.perfil.endereco?.rua || '',
            numero: data.perfil.endereco?.numero || '',
            bairro: data.perfil.endereco?.bairro || '',
            cidade: data.perfil.endereco?.cidade || '',
            estado: data.perfil.endereco?.estado || ''
          });
        }
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  const salvarPerfil = async () => {
    setSaving(true);
    try {
      const endereco = {
        cep: perfil.cep,
        rua: perfil.rua,
        numero: perfil.numero,
        bairro: perfil.bairro,
        cidade: perfil.cidade,
        estado: perfil.estado
      };

      const res = await fetch('/api/mei/perfil', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cnpj: perfil.cnpj,
          razao_social: perfil.razao_social,
          nome_fantasia: perfil.nome_fantasia,
          telefone: perfil.telefone,
          endereco
        }),
      });

      if (res.ok) {
        alert('Perfil salvo com sucesso!');
      } else {
        alert('Erro ao salvar perfil');
      }
    } catch (error) {
      alert('Erro ao salvar');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setPerfil(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return <div className="p-8 text-center">Carregando perfil...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-2">Configuração do MEI</h1>
      <p className="text-muted-foreground mb-8">Mantenha seus dados atualizados para emissão de notas</p>

      <Card>
        <CardHeader>
          <CardTitle>Dados da Empresa</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>CNPJ</Label>
              <Input 
                value={perfil.cnpj} 
                onChange={(e) => handleChange('cnpj', e.target.value)}
                placeholder="00.000.000/0001-00" 
              />
            </div>
            <div>
              <Label>Razão Social</Label>
              <Input 
                value={perfil.razao_social} 
                onChange={(e) => handleChange('razao_social', e.target.value)}
                placeholder="Nome Completo MEI" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Nome Fantasia</Label>
              <Input 
                value={perfil.nome_fantasia} 
                onChange={(e) => handleChange('nome_fantasia', e.target.value)}
                placeholder="Nome Fantasia (opcional)" 
              />
            </div>
            <div>
              <Label>Telefone</Label>
              <Input 
                value={perfil.telefone} 
                onChange={(e) => handleChange('telefone', e.target.value)}
                placeholder="(11) 99999-9999" 
              />
            </div>
          </div>

          <div className="pt-4 border-t">
            <h3 className="font-semibold mb-4">Endereço</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>CEP</Label>
                <Input 
                  value={perfil.cep} 
                  onChange={(e) => handleChange('cep', e.target.value)}
                  placeholder="00000-000" 
              </div>
              <div className="md:col-span-2">
                <Label>Rua / Logradouro</Label>
                <Input 
                  value={perfil.rua} 
                  onChange={(e) => handleChange('rua', e.target.value)}
                  placeholder="Rua Exemplo" 
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <Label>Número</Label>
                <Input 
                  value={perfil.numero} 
                  onChange={(e) => handleChange('numero', e.target.value)}
                </div>
              <div>
                <Label>Bairro</Label>
                <Input 
                  value={perfil.bairro} 
                  onChange={(e) => handleChange('bairro', e.target.value)}
                </div>
              <div>
                <Label>Cidade</Label>
                <Input 
                  value={perfil.cidade} 
                  onChange={(e) => handleChange('cidade', e.target.value)}
                </div>
            </div>

            <div className="mt-4">
              <Label>Estado (UF)</Label>
              <Input 
                value={perfil.estado} 
                onChange={(e) => handleChange('estado', e.target.value)}
                placeholder="SP" 
                maxLength={2}
              }
            </div>
          </div>

          <Button 
            onClick={salvarPerfil} 
            disabled={saving}
            className="w-full mt-6"
          >
            {saving ? 'Salvando...' : 'Salvar Configurações'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}