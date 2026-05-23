import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "NotaFácil MEI | Emissão Automática de Notas Fiscais",
  description: "Venda → Pix cai → Nota sai. O emissor de notas fiscais mais simples e rápido para MEIs. Conecte em 3 minutos e pare de perder tempo com burocracia.",
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
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="bg-zinc-950 text-white font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}