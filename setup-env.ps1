# ============================================================================
# Setup Automático - Business English RPG
# ============================================================================
# Cria .env.local com todas as variáveis necessárias
# ============================================================================

Write-Host "🚀 Business English RPG - Setup Automático" -ForegroundColor Cyan
Write-Host ""

$envFile = ".env.local"

# Gerar NEXTAUTH_SECRET automaticamente
$nextAuthSecret = [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))

Write-Host "📝 Criando arquivo .env.local..." -ForegroundColor Yellow

# Criar .env.local
$envContent = @"
# ============================================================================
# Environment Variables - Business English RPG
# ============================================================================

# NextAuth (✅ JÁ CONFIGURADO)
NEXTAUTH_SECRET=$nextAuthSecret
NEXTAUTH_URL=http://localhost:3000

# ============================================================================
# VOCÊ PRECISA PREENCHER APENAS ESTAS 3 LINHAS DO SUPABASE:
# ============================================================================
# 1. Acesse: https://supabase.com/dashboard
# 2. Vá em: Settings → Database → Connection string
# 3. Copie a string e cole abaixo (substitua as 3 linhas)

POSTGRES_URL=postgresql://postgres.[REF]:[PASSWORD]@[HOST]:6543/postgres
POSTGRES_PRISMA_URL=postgresql://postgres.[REF]:[PASSWORD]@[HOST]:6543/postgres?pgbouncer=true&connection_limit=1
POSTGRES_URL_NON_POOLING=postgresql://postgres.[REF]:[PASSWORD]@[HOST]:5432/postgres

# ============================================================================
# APIs OPCIONAIS (pode deixar em branco por enquanto)
# ============================================================================

# Google OAuth (opcional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Claude API (opcional)
ANTHROPIC_API_KEY=

# Whisper API (opcional)
OPENAI_API_KEY=

# Resend Email (opcional)
RESEND_API_KEY=
"@

$envContent | Out-File -FilePath $envFile -Encoding UTF8

Write-Host "✅ Arquivo .env.local criado!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 PRÓXIMO PASSO (SÓ 1 COISA):" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Abra o arquivo: .env.local" -ForegroundColor White
Write-Host "2. Substitua as 3 linhas POSTGRES_* com sua connection string do Supabase" -ForegroundColor White
Write-Host ""
Write-Host "🔗 Onde pegar a string do Supabase:" -ForegroundColor Yellow
Write-Host "   → https://supabase.com/dashboard" -ForegroundColor Gray
Write-Host "   → Settings → Database → Connection string" -ForegroundColor Gray
Write-Host ""
Write-Host "💡 Exemplo de como fica:" -ForegroundColor Yellow
Write-Host "   POSTGRES_URL=postgresql://postgres.abc123:suasenha@aws-0-sa-east-1.pooler.supabase.com:6543/postgres" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Depois rode: npm install && npm run db:push && npm run db:seed" -ForegroundColor White
Write-Host ""
