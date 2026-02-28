# Push database schema to Supabase
Write-Host "🗄️ Criando tabelas no Supabase..." -ForegroundColor Cyan

# Run drizzle push and auto-respond Yes
"y" | npm run db:push

Write-Host ""
Write-Host "✅ Tabelas criadas!" -ForegroundColor Green
