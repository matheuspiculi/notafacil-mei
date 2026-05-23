import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();

  // Por enquanto retorna todas as notas (adicione filtro por user_id quando tiver autenticação)
  // const { data: { user } } = await supabase.auth.getUser();

  try {
    // Simulação - em produção busque do Supabase
    return NextResponse.json({ 
      notas: [] 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}