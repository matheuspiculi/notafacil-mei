// services/open-finance.ts
// Mock + Real Open Finance integration

export interface PixTransaction {
  id: string
  valor: number
  data: string
  descricao: string
  tipo: 'entrada' | 'saida'
  banco: string
}

export async function getRecentPixTransactions(): Promise<PixTransaction[]> {
  // Em produção: chamar API do Open Finance (Pluggy, Belvo ou direto)
  // Por enquanto: dados mock realistas
  
  return [
    {
      id: 'pix_001',
      valor: 890.00,
      data: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
      descricao: 'Venda - João Silva',
      tipo: 'entrada',
      banco: 'Nubank'
    },
    {
      id: 'pix_002',
      valor: 450.00,
      data: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      descricao: 'Serviço prestado - Maria Costa',
      tipo: 'entrada',
      banco: 'Inter'
    },
    {
      id: 'pix_003',
      valor: 120.50,
      data: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      descricao: 'Reembolso fornecedor',
      tipo: 'saida',
      banco: 'Itaú'
    }
  ]
}

export async function detectSaleFromPix(transaction: PixTransaction) {
  // IA simples para detectar se é venda e sugerir nota
  const isSale = transaction.tipo === 'entrada' && 
                 !transaction.descricao.toLowerCase().includes('reembolso')
  
  if (isSale) {
    return {
      suggested: true,
      cliente: transaction.descricao.replace('Venda - ', '').replace('Serviço prestado - ', ''),
      valor: transaction.valor,
      tipo_nota: transaction.valor > 500 ? 'NF-e' : 'NFS-e'
    }
  }
  
  return { suggested: false }
}