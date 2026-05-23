import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const FOCUS_NFE_API_KEY = process.env.FOCUS_NFE_API_KEY || 'sua_api_key_aqui';
const FOCUS_BASE_URL = 'https://api.focusnfe.com.br/v2';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();

  // Por enquanto usamos um user_id fixo até configurar autenticação completa
  const userId = '00000000-0000-0000-0000-000000000000';

  try {
    const body = await request.json();
    const { tipo, valor, descricao, tomadorCnpj, tomadorNome } = body;

    if (!valor || !descricao) {
      return NextResponse.json({ error: 'Valor e descrição são obrigatórios' }, { status: 400 });
    }

    const endpoint = tipo === 'nfse' ? `${FOCUS_BASE_URL}/nfse` : `${FOCUS_BASE_URL}/nfe`;
    const payload = tipo === 'nfse'
      ? { tomador: { cnpj: tomadorCnpj }, servicos: [{ descricao, valor }] }
      : { natureza_operacao: 'Venda', itens: [{ descricao, quantidade: 1, valor_unitario: valor }] };

    const focusRes = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(FOCUS_NFE_API_KEY + ':').toString('base64')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const focusData = await focusRes.json();

    if (!focusRes.ok) {
      return NextResponse.json({ error: focusData.message || 'Erro na emissão' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      chave: focusData.chave || focusData.access_key,
      pdf: focusData.pdf_url || focusData.danfe_url
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}