"use client";

import { useState } from "react";

export default function ConfiguracaoPage() {
  const [dados, setDados] = useState({
    nome: "Empresa Exemplo MEI",
    cnpj: "12.345.678/0001-90",
    endereco: "Rua das Flores, 123 - Centro",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01234-567",
    email: "contato@exemplo.com",
    telefone: "(11) 98765-4321",
  });

  const handleSalvar = () => {
    alert("✅ Configurações salvas com sucesso! (simulação)");
    // Aqui você pode chamar a API do Supabase depois
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-2">Configuração do MEI</h1>
      <p className="text-muted-foreground mb-8">
        Mantenha seus dados atualizados para emissão de notas
      </p>

      <div className="space-y-8">
        {/* Dados da Empresa */}
        <div className="bg-card border rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Dados da Empresa</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Nome / Razão Social</label>
              <input
                type="text"
                value={dados.nome}
                onChange={(e) => setDados({ ...dados, nome: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CNPJ</label>
              <input
                type="text"
                value={dados.cnpj}
                className="w-full px-4 py-3 rounded-xl border bg-background"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Contato */}
        <div className="bg-card border rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Contato</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">E-mail</label>
              <input
                type="email"
                value={dados.email}
                onChange={(e) => setDados({ ...dados, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Telefone</label>
              <input
                type="tel"
                value={dados.telefone}
                onChange={(e) => setDados({ ...dados, telefone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border bg-background"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleSalvar}
          className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-semibold hover:bg-primary/90 transition"
        >
          Salvar Configurações
        </button>
      </div>
    </div>
  );
}
