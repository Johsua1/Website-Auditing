# This script will be used to verify all files are in place
Write-Host "Checking project structure..."
$basePath = "c:\Users\Angel\Desktop\AudtingWebsite\Auditing-Website\Web-Auditing"

$directories = @(
    "$basePath\src\components",
    "$basePath\src\pages",
    "$basePath\src\data",
    "$basePath\src\utils"
)

foreach ($dir in $directories) {
    if (Test-Path $dir) {
        Write-Host "✓ $dir exists" -ForegroundColor Green
    } else {
        Write-Host "✗ $dir missing" -ForegroundColor Red
    }
}

Write-Host "`nProject structure verified!"
