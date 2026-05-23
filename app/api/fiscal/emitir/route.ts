import { NextRequest, NextResponse } from 'next/server';

// Integração com Focus NFe (recomendado para Next.js)
// Substitua pela sua API Key real
const FOCUS_NFE_API_KEY = process.env.FOCUS_NFE_API_KEY || 'sua_api_key_aqui';

const FOCUS_BASE_URL = 'https://api.focusnfe.com.br/v2';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tipo, valor, descricao, tomadorCnpj } = body;

    if (!valor || !descricao) {
      return NextResponse.json({ error: 'Valor e descrição são obrigatórios' }, { status: 400 });
    }

    let endpoint = '';
    let payload: any = {};

    if (tipo === 'nfse') {
      // NFS-e Nacional via Focus NFe
      endpoint = `${FOCUS_BASE_URL}/nfse`;
      payload = {
        tomador: { cnpj: tomadorCnpj },
        servicos: [{
          descricao,
          valor: valor,
          iss: { aliquota: 5 }
        }],
        // Adicione mais campos conforme necessário
      };
    } else {
      // NF-e via Focus NFe
      endpoint = `${FOCUS_BASE_URL}/nfe`;
      payload = {
        natureza_operacao: 'Venda de mercadoria',
        itens: [{
          descricao,
          quantidade: 1,
          valor_unitario: valor,
          valor_total: valor
        }],
        // Preencha os demais campos obrigatórios conforme documentação Focus
      };
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(FOCUS_NFE_API_KEY + ':').toString('base64')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.message || 'Erro na emissão' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      chave: data.chave || data.access_key,
      pdf: data.pdf_url || data.danfe_url,
      xml: data.xml_url,
      status: 'Autorizada'
    });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || 'Erro interno' }, { status: 500 });
    }
}