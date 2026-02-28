#!/bin/bash
# Setup com Neon - Pega variáveis do Vercel automaticamente

echo "🚀 Configurando Neon Database..."
echo ""
echo "📋 Passo 1: Criar banco no Vercel (2 minutos)"
echo "   1. Acesse: https://vercel.com/luizgsalles/business-english-rpg"
echo "   2. Storage → Create Database → Postgres"
echo ""
echo "📋 Passo 2: Puxar variáveis para local"
echo "   Rode: vercel env pull .env.local"
echo ""
echo "📋 Passo 3: Setup automático"
echo "   npm install && npm run db:push && npm run db:seed"
echo ""
