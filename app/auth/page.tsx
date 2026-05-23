'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`
      }
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Link mágico enviado! Verifique seu e-mail.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-zinc-900 rounded-3xl p-10">
        <div className="text-center mb-10">
          <div className="text-green-500 text-6xl mb-4">📝</div>
          <h1 className="text-4xl font-bold">NotaFácil MEI</h1>
          <p className="text-zinc-400 mt-2">Entre com seu e-mail para começar</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm mb-2 text-zinc-400">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-lg focus:outline-none focus:border-green-500"
              placeholder="seu@email.com"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-zinc-700 text-black font-semibold py-4 rounded-2xl text-lg transition-all"
          >
            {loading ? 'Enviando...' : 'Enviar link mágico'}
          </button>
        </form>

        {message && (
          <div className="mt-6 p-4 bg-zinc-800 rounded-2xl text-center text-sm">
            {message}
          </div>
        )}

        <div className="mt-8 text-center text-xs text-zinc-500">
          Ao continuar você concorda com nossos Termos e Política de Privacidade
        </div>
      </div>
    </div>
  )
}