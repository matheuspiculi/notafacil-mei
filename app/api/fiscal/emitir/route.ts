import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const FOCUS_NFE_API_KEY = process.env.FOCUS_NFE_API_KEY || 'sua_api_key_aqui';
const FOCUS_BASE_URL = 'https://api.focusnfe.com.br/v2';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tipo, valor, descricao, tomadorCnpj, tomadorNome } = body;

    if (!valor || !descricao) {
      return NextResponse.json({ error: 'Valor e descrição são obrigatórios' }, { status: 400 });
    }

    // 1. Emitir nota via Focus NFe (ou sua API preferida)
    let endpoint = tipo === 'nfse' ? `${FOCUS_BASE_URL}/nfse` : `${FOCUS_BASE_URL}/nfe`;
    
    const payload = tipo === 'nfse' 
      ? { tomador: { cnpj: tomadorCnpj }, servicos: [{ descricao, valor }] }
      : { natureza_operacao: 'Venda', itens: [{ descricao, quantidade: 1, valor_unitario: valor }] };

    const focusResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(FOCUS_NFE_API_KEY + ':').toString('base64')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const focusData = await focusResponse.json();

    if (!focusResponse.ok) {
      return NextResponse.json({ error: focusData.message || 'Erro na emissão' }, { status: 400 });
    }

    // 2. Salvar no Supabase (Histórico)
    const { data: notaSalva, error: dbError } = await supabase
      .from('notas_emitidas')
      .insert({
        tipo,
        chave_acesso: focusData.chave || focusData.access_key || 'CHAVE-' + Date.now(),
        numero_nota: focusData.numero || '0001',
        valor,
        descricao,
        tomador_cnpj: tomadorCnpj,
        tomador_nome: tomadorNome || 'Cliente',
        pdf_url: focusData.pdf_url || focusData.danfe_url,
        xml_url: focusData.xml_url,
        status: 'autorizada',
        user_id: '00000000-0000-0000-0000-000000000000' // Substitua pelo ID real do usuário logado
      })
      .select()
      .single();

    if (dbError) {
      console.error('Erro ao salvar no banco:', dbError);
    }

    return NextResponse.json({
      success: true,
      chave: focusData.chave || focusData.access_key,
      pdf: focusData.pdf_url || focusData.danfe_url,
      nota_id: notaSalva?.id
    });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}