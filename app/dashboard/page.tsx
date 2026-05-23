'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Dashboard() {
  const [notesThisMonth, setNotesThisMonth] = useState(14)
  const [hoursSaved, setHoursSaved] = useState(52)
  const [dasProjection, setDasProjection] = useState(318)
  const [isEmitting, setIsEmitting] = useState(false)

  const emitNote = async () => {
    setIsEmitting(true)
    
    // Simulate API call to Focus NFe
    await new Promise(resolve => setTimeout(resolve, 1200))
    
    setNotesThisMonth(prev => prev + 1)
    setHoursSaved(prev => prev + 0.5)
    
    alert('✅ Nota fiscal emitida com sucesso!\n\nNúmero: 000.000.000-00\nValor: R$ 450,00\nCliente: João Silva MEI')
    
    setIsEmitting(false)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <div className="text-3xl">📝</div>
            <div>
              <div className="font-bold text-xl">NotaFácil</div>
              <div className="text-[10px] text-green-500 -mt-1">MEI</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm px-4 py-1.5 bg-zinc-900 rounded-full flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Plano Pro
            </div>
            <div className="w-9 h-9 bg-zinc-700 rounded-full flex items-center justify-center text-sm font-medium">MP</div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="text-sm text-green-500 font-medium tracking-[3px]">BEM-VINDO DE VOLTA</div>
            <h1 className="text-5xl font-bold tracking-tighter">Matheus Piculi</h1>
          </div>
          
          <Link 
            href="/auth" 
            className="text-sm text-zinc-400 hover:text-white flex items-center gap-2"
          >
            Sair →
          </Link>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-7">
            <div className="text-sm text-zinc-400">Notas este mês</div>
            <div className="text-6xl font-bold mt-3 tabular-nums">{notesThisMonth}</div>
            <div className="text-emerald-400 text-sm mt-2 flex items-center gap-1">
              +3 desde ontem
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-7">
            <div className="text-sm text-zinc-400">Horas economizadas</div>
            <div className="text-6xl font-bold mt-3 tabular-nums">{hoursSaved}</div>
            <div className="text-emerald-400 text-sm mt-2">Este mês</div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-7">
            <div className="text-sm text-zinc-400">Projeção DAS</div>
            <div className="text-6xl font-bold mt-3 tabular-nums">R$ {dasProjection}</div>
            <div className="text-amber-400 text-sm mt-2">Vence em 18 dias</div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-7 flex flex-col">
            <div className="text-sm text-zinc-400">Saúde Fiscal</div>
            <div className="flex-1 flex items-end">
              <div className="text-6xl font-bold text-emerald-400">98</div>
            </div>
            <div className="text-xs text-emerald-400 mt-1">Excelente</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-3 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <h3 className="font-semibold text-xl mb-6">Ações Rápidas</h3>
            
            <div className="space-y-4">
              <button 
                onClick={emitNote}
                disabled={isEmitting}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-zinc-700 text-black font-semibold h-20 rounded-2xl flex items-center justify-center gap-4 text-xl active:scale-[0.985] transition-all"
              >
                {isEmitting ? (
                  <>Processando nota fiscal...</>
                ) : (
                  <>
                    🔄 Emitir Nota Fiscal Agora
                  </>
                )}
              </button>

              <div className="grid grid-cols-2 gap-4">
                <button className="h-16 border border-zinc-700 hover:bg-zinc-800 rounded-2xl flex items-center justify-center gap-3 text-sm">
                  📄 Ver todas as notas
                </button>
                <button className="h-16 border border-zinc-700 hover:bg-zinc-800 rounded-2xl flex items-center justify-center gap-3 text-sm">
                  📊 Exportar para contador
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <h3 className="font-semibold text-xl mb-6">Atividade Recente</h3>
            
            <div className="space-y-5 text-sm">
              {[
                { time: '2 min atrás', action: 'Nota #1847 emitida', value: 'R$ 890' },
                { time: 'Hoje', action: 'PIX recebido detectado', value: 'R$ 450' },
                { time: 'Ontem', action: 'Export enviado ao contador', value: '' }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-start border-l-2 border-emerald-500 pl-4">
                  <div>
                    <div className="font-medium">{item.action}</div>
                    <div className="text-xs text-zinc-500">{item.time}</div>
                  </div>
                  {item.value && <div className="text-emerald-400 font-mono text-sm">{item.value}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}