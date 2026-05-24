"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, History, Settings, Home, LogOut } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/emitir", label: "Emitir Nota", icon: FileText },
    { href: "/historico", label: "Histórico", icon: History },
    { href: "/configuracao", label: "Configuração", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
        <div className="p-6 border-b border-zinc-800">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            📄 NotaFácil
          </h1>
          <p className="text-xs text-zinc-500 mt-1">MEI</p>
        </div>

        <nav className="flex-1 p-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-colors ${
                  isActive
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <button
            onClick={() => {/* logout logic */}}
            className="flex items-center gap-3 text-zinc-400 hover:text-white w-full px-4 py-3 rounded-xl hover:bg-zinc-800"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </div>

      {/* Conteúdo principal */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
