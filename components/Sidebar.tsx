"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  History, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/configuracao', label: 'Configuração', icon: Settings },
    { href: '/emitir', label: 'Emitir Nota', icon: FileText },
    { href: '/historico', label: 'Histórico', icon: History },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/auth';
  };

  return (
    <div className="w-64 bg-zinc-950 border-r border-zinc-800 h-screen flex flex-col">
      <div className="p-6 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
            <span className="text-2xl">📋</span>
          </div>
          <div>
            <div className="font-bold text-xl">NotaFácil</div>
            <div className="text-xs text-zinc-500">MEI</div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="text-xs uppercase tracking-widest text-zinc-500 px-3 mb-3">MENU</div>
        
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all
                  ${isActive 
                    ? 'bg-white text-black font-medium' 
                    : 'hover:bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-zinc-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-red-400 hover:bg-zinc-900 rounded-xl transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sair da conta
        </button>
      </div>
    </div>
  );
}