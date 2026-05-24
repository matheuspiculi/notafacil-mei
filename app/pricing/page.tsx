'use client'

export default function PricingPage() {
  const plans = [
    {
      name: 'Grátis',
      price: '0',
      period: 'para sempre',
      features: [
        '30 notas fiscais/mês',
        '1 conta bancária',
        'Suporte por e-mail'
      ],
      cta: 'Continuar no grátis',
      popular: false
    },
    {
      name: 'Pro',
      price: '59',
      period: 'por mês',
      features: [
        'Notas ilimitadas',
        'Até 3 contas bancárias',
        'IA de classificação automática',
        'Export automático para contador',
        'Suporte prioritário'
      ],
      cta: 'Assinar Pro agora',
      popular: true
    },
    {
      name: 'Business',
      price: '129',
      period: 'por mês',
      features: [
        'Tudo do Pro',
        'Portal do Contador',
        'Relatórios avançados'
      ],
      cta: 'Falar com vendas',
      popular: false
    }
  ]

  const handleSubscribe = (plan: string) => {
    if (plan === 'Grátis') {
      alert('Você já está no plano grátis!')
    } else if (plan === 'Pro') {
      alert('Redirecionando para checkout do Mercado Pago... (demo)')
      // Aqui entraria integração real com Mercado Pago
    } else {
      alert('Entraremos em contato em até 2 horas!')
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-emerald-500/10 text-emerald-400 px-4 py-1 rounded-full text-sm mb-4">
            Preços transparentes
          </div>
          <h1 className="text-6xl font-bold tracking-tighter">Escolha o plano ideal</h1>
          <p className="text-2xl text-zinc-400 mt-4 max-w-md mx-auto">
            Pague apenas pelo que precisa. Cancele quando quiser.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-zinc-900 border rounded-3xl p-8 flex flex-col ${plan.popular ? 'border-emerald-500 scale-[1.02] shadow-2xl shadow-emerald-950' : 'border-zinc-800'}`}
            >
              {plan.popular && (
                <div className="-mt-10 mb-6 flex justify-center">
                  <div className="bg-emerald-500 text-black text-xs font-bold px-6 py-1 rounded-full tracking-widest">
                    MAIS POPULAR
                  </div>
                </div>
              )}

              <div>
                <div className="font-semibold text-2xl">{plan.name}</div>
                <div className="mt-6 flex items-baseline">
                  <span className="text-6xl font-bold tracking-tighter">R$ {plan.price}</span>
                  <span className="text-zinc-400 ml-2">/{plan.period}</span>
                </div>
              </div>

              <ul className="mt-10 space-y-4 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="text-emerald-500 mt-1">✓</div>
                    <span className="text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan.name)}
                className={`mt-10 w-full py-4 rounded-2xl font-semibold transition-all ${plan.popular 
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-black' 
                  : 'border border-zinc-700 hover:bg-zinc-800'}`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 text-sm text-zinc-500">
          Todos os planos incluem 14 dias de garantia. Cancele a qualquer momento.
        </div>
      </div>
    </div>
  )
}