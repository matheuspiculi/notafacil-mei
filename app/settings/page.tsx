'use client'

import { useState } from 'react'

export default function SettingsPage() {
  const [cnpj, setCnpj] = useState('12.345.678/0001-90')
  const [razaoSocial, setRazaoSocial] = useState('Matheus Piculi MEI')
  const [certificado, setCertificado] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleCertificateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCertificado(e.target.files[0])
    }
  }

  const handleSave = async () => {
    setIsUploading(true)
    
    // Simulate upload to Supabase Storage + Focus NFe
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setSuccess(true)
    setIsUploading(false)
    
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Configurações</h1>
          <p className="text-zinc-400 mt-2">Dados fiscais e certificado digital</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-8">
          <h3 className="font-semibold text-xl mb-6">Dados do Emitente</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">CNPJ</label>
              <input
                type="text"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-3.5 text-lg font-mono"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Razão Social / Nome</label>
              <input
                type="text"
                value={razaoSocial}
                onChange={(e) => setRazaoSocial(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-3.5 text-lg"
              />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
          <h3 className="font-semibold text-xl mb-6">Certificado Digital (A1)</h3>
          
          <div className="border border-dashed border-zinc-700 rounded-2xl p-8 text-center mb-6">
            <input
              type="file"
              accept=".pfx,.p12"
              onChange={handleCertificateUpload}
              className="hidden"
              id="cert-upload"
            />
            <label 
              htmlFor="cert-upload"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <div className="text-6xl mb-4">🔐</div>
              <div className="font-medium">Clique para enviar seu certificado A1</div>
              <div className="text-sm text-zinc-500 mt-1">.pfx ou .p12 • Máx 5MB</div>
            </label>
          </div>

          {certificado && (
            <div className="bg-zinc-800 p-4 rounded-2xl flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="text-green-500">✓</div>
                <div>{certificado.name}</div>
              </div>
              <button 
                onClick={() => setCertificado(null)}
                className="text-red-400 hover:text-red-500 text-sm"
              >
                Remover
              </button>
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={isUploading || !certificado}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-zinc-700 text-black font-semibold py-4 rounded-2xl transition-all"
          >
            {isUploading ? 'Salvando e validando certificado...' : 'Salvar Configurações'}
          </button>

          {success && (
            <div className="mt-4 p-4 bg-emerald-950 border border-emerald-500 rounded-2xl text-emerald-400 text-center">
              ✅ Certificado validado e salvo com sucesso!
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-xs text-zinc-500">
          Seus dados são criptografados e armazenados com segurança no Supabase
        </div>
      </div>
    </div>
  )
}