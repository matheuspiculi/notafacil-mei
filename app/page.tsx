'use client'

import Link from 'next/link'

export default function FinalLanding() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-hidden">
      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 bg-zinc-950/90 backdrop-blur-lg border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">📝</div>
            <div className="font-bold text-2xl tracking-tight">NotaFácil <span className="text-emerald-500">MEI</span></div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/pricing" className="hover:text-emerald-400 transition-colors">Planos</Link>
            <Link href="/auth" className="bg-white text-black px-6 py-2.5 rounded-2xl font-semibold hover:bg-zinc-200 transition-all">
              Começar grátis
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div className="pt-20 pb-16 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-zinc-900 px-5 py-1.5 rounded-full mb-8 border border-zinc-800">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Beta aberto • 187 MEIs usando</span>
        </div>

        <h1 className="text-7xl md:text-[92px] font-bold tracking-tighter leading-none mb-8">
          Venda.<br />Pix cai.<br />
          <span className="text-emerald-500">Nota sai.</span><br />Automaticamente.
        </h1>

        <p className="text-2xl text-zinc-400 max-w-2xl mx-auto mb-12">
          O SaaS que se vende sozinho para MEIs. Conecte sua conta e sua loja em 3 minutos.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/auth" 
            className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold text-xl px-14 py-5 rounded-3xl transition-all active:scale-[0.985]"
          >
            Começar grátis (40 notas/mês)
          </Link>
          <Link 
            href="/pricing" 
            className="border border-zinc-700 hover:bg-zinc-900 font-semibold text-xl px-10 py-5 rounded-3xl transition-all"
          >
            Ver planos
          </Link>
        </div>

        <div className="mt-8 text-sm text-zinc-500">Funciona com Nubank, Inter, Itaú, Bradesco, Nuvemshop, Shopify e Mercado Pago</div>
      </div>

      {/* TRUST BAR */}
      <div className="border-y border-zinc-800 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center items-center gap-x-16 gap-y-6 opacity-60">
          <div className="text-xl font-semibold">Nubank</div>
          <div className="text-xl font-semibold">Inter</div>
          <div className="text-xl font-semibold">Nuvemshop</div>
          <div className="text-xl font-semibold">Mercado Pago</div>
          <div className="text-xl font-semibold">Shopify</div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-8">
        {[ 
          { icon: "🔄", title: "Detecção automática de PIX", desc: "Conecte sua conta uma vez. Todo PIX de venda vira sugestão de nota." },
          { icon: "🤖", title: "IA que entende seu negócio", desc: "Classifica vendas, sugere CFOP/NCM e emite a nota correta automaticamente." },
          { icon: "📊", title: "Contador no piloto automático", desc: "Exporta tudo automaticamente. Seu contador recebe os arquivos organizados todo mês." }
        ].map((f, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 p-10 rounded-3xl">
            <div className="text-6xl mb-8">{f.icon}</div>
            <h3 className="text-3xl font-semibold mb-4 tracking-tight">{f.title}</h3>
            <p className="text-xl text-zinc-400 leading-snug">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* FINAL CTA */}
      <div className="bg-zinc-900 border-t border-zinc-800 py-20 text-center px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-6xl font-bold tracking-tighter mb-6">Pronto para parar de perder tempo com nota fiscal?</h2>
          <p className="text-2xl text-zinc-400 mb-10">Junte-se a mais de 180 MEIs que já economizam horas toda semana.</p>
          
          <Link 
            href="/auth" 
            className="inline-block bg-emerald-500 hover:bg-emerald-600 text-black font-semibold text-2xl px-16 py-6 rounded-3xl transition-all active:scale-[0.985]"
          >
            Começar grátis agora
          </Link>
          
          <div className="mt-6 text-sm text-zinc-500">14 dias de garantia • Cancele quando quiser</div>
        </div>
      </div>

      <footer className="border-t border-zinc-800 py-12 text-center text-sm text-zinc-500">
        Feito com ❤️ por Matheus Piculi • 2026 • notafacilmei.com.br
      </footer>
    </div>
  )
}