# NotaFácil MEI 🚀

**O emissor de notas fiscais mais simples para MEI**

Emita **NFS-e Nacional** e **NF-e/NFC-e** direto do seu navegador, com integração oficial gov.br e SEFAZ.

## ✨ Funcionalidades

- Emissão de **Nota de Serviço (NFS-e Nacional)**
- Emissão de **Nota de Venda (NF-e / NFC-e)**
- Interface moderna e fácil de usar
- Armazenamento seguro no Supabase
- Histórico de notas emitidas
- Geração de PDF automática

## Stack

- Next.js 15 + TypeScript + Tailwind
- Supabase (auth + banco)
- Integração fiscal via API (Focus NFe / oficial)

## Como Começar

```bash
npm install
npm run dev
```

## Configuração Fiscal (Importante!)

1. Crie uma conta na [Focus NFe](https://focusnfe.com.br) (ou NFE.io)
2. Pegue sua API Key
3. Adicione no `.env.local`:
   ```
   FOCUS_NFE_API_KEY=sua_chave_aqui
   ```

Ou use a integração direta com o Emissor Nacional (em desenvolvimento).

## Páginas

- `/emitir` → Tela de emissão rápida
- `/historico` → Todas as notas emitidas

## Próximos Passos

- Upload de Certificado Digital A1 direto na interface
- Emissão offline + contingência automática
- Integração com WhatsApp / Email automático

**Feito para MEIs que querem simplicidade total.**