param ($version='latest')

Write-Host "Current Version:" $version
$currentFolder = $PSScriptRoot
$slnFolder = Join-Path $currentFolder "../../"

Write-Host "********* BUILDING DbMigrator *********" -ForegroundColor Green
$dbMigratorFolder = Join-Path $slnFolder "src/FireBytes.Unified.DbMigrator"
Set-Location $dbMigratorFolder
dotnet publish -c Release
docker build -f Dockerfile.local -t firebytes.azurecr.io/firebytes/wave/db-migrator:$version .
docker push firebytes.azurecr.io/firebytes/wave/db-migrator:$version

# Write-Host "********* BUILDING Angular Application *********" -ForegroundColor Green
# $angularAppFolder = Join-Path $slnFolder "../angular"
# Set-Location $angularAppFolder
# yarn
# npm run build:prod
# docker build -f Dockerfile.local -t firebytes.azurecr.io/firebytes/unified-angular:$version .

Write-Host "********* BUILDING Api.Host Application *********" -ForegroundColor Green
$hostFolder = Join-Path $slnFolder "src/FireBytes.Unified.HttpApi.Host"
Set-Location $hostFolder
dotnet publish -c Release
docker build -f Dockerfile.local -t firebytes.azurecr.io/firebytes/wave/host-api:$version .
docker push firebytes.azurecr.io/firebytes/wave/host-api:$version

$authServerAppFolder = Join-Path $slnFolder "src/FireBytes.Unified.AuthServer"
Set-Location $authServerAppFolder
dotnet publish -c Release
docker build -f Dockerfile.local -t firebytes.azurecr.io/firebytes/wave/authserver:$version .
docker push firebytes.azurecr.io/firebytes/wave/authserver:$version

### ALL COMPLETED
Write-Host "COMPLETED" -ForegroundColor Green
Set-Location $currentFolder