#!/bin/bash
echo "🚀 Business English RPG - Setup Completo"
echo ""
echo "📦 Instalando dependências..."
npm install
echo ""
echo "🗄️ Criando tabelas no Supabase..."
npm run db:push
echo ""
echo "🌱 Adicionando dados iniciais..."
npm run db:seed
echo ""
echo "✅ SETUP COMPLETO!"
echo ""
echo "🎯 Próximo passo:"
echo "   1. Copie as mesmas variáveis do .env.local para o Vercel"
echo "   2. Settings → Environment Variables → Add"
echo ""
echo "🌐 Depois rode: npm run dev"
