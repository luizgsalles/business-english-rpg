# ============================================================================
# Copiar Variáveis para Vercel - Business English RPG
# ============================================================================
# Lê .env.local e formata para colar no Vercel
# ============================================================================

Write-Host "📋 Copiando variáveis para Vercel..." -ForegroundColor Cyan
Write-Host ""

if (-Not (Test-Path ".env.local")) {
    Write-Host "❌ Erro: .env.local não encontrado!" -ForegroundColor Red
    Write-Host "Execute primeiro: .\setup-env.ps1" -ForegroundColor Yellow
    exit 1
}

# Ler .env.local
$envContent = Get-Content ".env.local" | Where-Object {
    $_ -notmatch "^#" -and
    $_ -notmatch "^$" -and
    $_ -match "="
}

Write-Host "✅ Variáveis encontradas no .env.local:" -ForegroundColor Green
Write-Host ""

foreach ($line in $envContent) {
    if ($line -match "^([^=]+)=(.*)$") {
        $key = $matches[1].Trim()
        $value = $matches[2].Trim()

        if ($value -ne "" -and $value -notmatch "\[") {
            Write-Host "  $key" -ForegroundColor White
        }
    }
}

Write-Host ""
Write-Host "📋 COPIE E COLE NO VERCEL:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Acesse: https://vercel.com/luizgsalles/business-english-rpg/settings/environment-variables" -ForegroundColor Yellow
Write-Host "2. Para cada variável abaixo:" -ForegroundColor Yellow
Write-Host "   - Clique 'Add New'" -ForegroundColor Gray
Write-Host "   - Cole o Key" -ForegroundColor Gray
Write-Host "   - Cole o Value" -ForegroundColor Gray
Write-Host ""

foreach ($line in $envContent) {
    if ($line -match "^([^=]+)=(.*)$") {
        $key = $matches[1].Trim()
        $value = $matches[2].Trim()

        if ($value -ne "" -and $value -notmatch "\[") {
            Write-Host "Key: $key" -ForegroundColor Green
            Write-Host "Value: $value" -ForegroundColor White
            Write-Host "---" -ForegroundColor Gray
        }
    }
}

Write-Host ""
Write-Host "✅ Depois de adicionar no Vercel, faça Redeploy!" -ForegroundColor Green
Write-Host ""
