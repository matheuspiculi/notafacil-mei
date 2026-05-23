import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NotaFácil MEI | Emissão Automática de Notas Fiscais",
  description: "Venda → Pix cai → Nota sai. O SaaS que se vende sozinho para MEIs.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-zinc-950 text-white font-sans">
        {children}
      </body>
    </html>
  );
}