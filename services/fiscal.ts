// Serviço central de emissão fiscal
// Aqui você pode trocar fácilmente o provedor (Focus NFe, NFE.io, direto gov.br, etc.)

export interface EmitirNotaParams {
  tipo: 'nfse' | 'nfe';
  valor: number;
  descricao: string;
  tomadorCnpj?: string;
  tomadorNome?: string;
}

export async function emitirNotaFiscal(params: EmitirNotaParams) {
  // Chama a rota interna do Next.js
  const res = await fetch('/api/fiscal/emitir', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    throw new Error('Falha ao emitir nota');
  }

  return res.json();
}