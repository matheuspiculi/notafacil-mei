import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const FOCUS_NFE_API_KEY = process.env.FOCUS_NFE_API_KEY || 'sua_api_key_aqui';
const FOCUS_BASE_URL = 'https://api.focusnfe.com.br/v2';

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Faça login para emitir notas' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { tipo, valor, descricao, tomadorCnpj, tomadorNome } = body;

    if (!valor || !descricao) {
      return NextResponse.json({ error: 'Valor e descrição são obrigatórios' }, { status: 400 });
    }

    // Emissão via Focus NFe
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

    // Salvar no Supabase com user_id real
    const { error: dbError } = await supabase
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
        user_id: user.id
      });

    if (dbError) {
      console.error('Erro ao salvar nota:', dbError);
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