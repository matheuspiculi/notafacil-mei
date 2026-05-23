'use client'

import { useState } from 'react'

export default function ContadorPortal() {
  const [selectedClient, setSelectedClient] = useState('')

  const clients = [
    { id: 1, name: 'Matheus Piculi MEI', cnpj: '12.345.678/0001-90', notes: 47, lastExport: '22/05/2026' },
    { id: 2, name: 'João Silva MEI', cnpj: '98.765.432/0001-10', notes: 31, lastExport: '21/05/2026' },
    { id: 3, name: 'Maria Costa MEI', cnpj: '11.222.333/0001-44', notes: 19, lastExport: '20/05/2026' },
  ]

  const selected = clients.find(c => c.name === selectedClient) || clients[0]

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <div className="text-emerald-500 text-sm font-medium tracking-[2px]">PORTAL DO CONTADOR</div>
            <h1 className="text-5xl font-bold tracking-tighter">Gestão de Clientes MEI</h1>
          </div>
          <div className="text-right">
            <div className="text-sm text-zinc-400">Contador: João Contábil</div>
            <div className="text-emerald-400">12 clientes ativos</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <h3 className="font-semibold mb-4">Seus Clientes</h3>
            <div className="space-y-2">
              {clients.map((client) => (
                <button
                  key={client.id}
                  onClick={() => setSelectedClient(client.name)}
                  className={`w-full text-left p-4 rounded-2xl transition-all ${selectedClient === client.name || (!selectedClient && client.id === 1) ? 'bg-emerald-500 text-black' : 'hover:bg-zinc-800'}`}
                >
                  <div className="font-medium">{client.name}</div>
                  <div className="text-xs opacity-70">{client.cnpj}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl font-semibold">{selected.name}</h2>
                  <p className="text-zinc-400">{selected.cnpj}</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-emerald-400">{selected.notes}</div>
                  <div className="text-sm text-zinc-400">notas este mês</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-zinc-800 p-5 rounded-2xl">
                  <div className="text-sm text-zinc-400">Exportado em</div>
                  <div className="font-medium mt-1">{selected.lastExport}</div>
                </div>
                <div className="bg-zinc-800 p-5 rounded-2xl">
                  <div className="text-sm text-zinc-400">Status</div>
                  <div className="text-emerald-400 font-medium mt-1">Em dia ✓</div>
                </div>
                <div className="bg-zinc-800 p-5 rounded-2xl">
                  <div className="text-sm text-zinc-400">DAS</div>
                  <div className="font-medium mt-1">R$ 312</div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
              <h3 className="font-semibold text-xl mb-6">Ações Rápidas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold py-4 rounded-2xl">
                  Exportar todas as notas
                </button>
                <button className="border border-zinc-700 hover:bg-zinc-800 py-4 rounded-2xl">
                  Enviar e-mail para cliente
                </button>
                <button className="border border-zinc-700 hover:bg-zinc-800 py-4 rounded-2xl">
                  Gerar relatório mensal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}