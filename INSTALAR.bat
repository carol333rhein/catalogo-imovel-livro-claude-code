@echo off
cd /d "%~dp0"
echo ==================================================
echo   Catalogo de imovel com o Claude Code
echo ==================================================
echo.

if not exist "package.json" (
  echo ATENCAO: este arquivo ainda esta dentro do .zip.
  echo Feche esta janela, clique com o botao direito no arquivo .zip
  echo e escolha "Extrair tudo". Depois abra a pasta extraida e
  echo de dois cliques em INSTALAR de novo.
  echo.
  pause
  exit /b 1
)

where node >nul 2>nul
if errorlevel 1 (
  echo [1/4] Instalando o Node.js (so na primeira vez)...
  winget install -e --id OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements
  if errorlevel 1 (
    echo Nao consegui instalar automaticamente. Baixe o Node.js LTS em https://nodejs.org, instale, e de dois cliques em INSTALAR de novo.
    pause
    exit /b 1
  )
  echo.
  echo Node.js instalado. FECHE esta janela e de dois cliques em INSTALAR de novo para continuar.
  pause
  exit /b
) else (
  echo [1/4] Node.js ja esta instalado.
)

echo.
echo [2/4] Preparando o video (pode demorar alguns minutos)...
call npm install
if errorlevel 1 (
  echo Deu erro. Confira sua internet e de dois cliques em INSTALAR de novo.
  pause
  exit /b 1
)

echo.
echo [3/4] Baixando o navegador interno que gera o video...
call npx remotion browser ensure

set "CLAUDE_CMD="
where claude >nul 2>nul
if not errorlevel 1 set "CLAUDE_CMD=claude"
if "%CLAUDE_CMD%"=="" if exist "%USERPROFILE%\.local\bin\claude.exe" set "CLAUDE_CMD=%USERPROFILE%\.local\bin\claude.exe"
if "%CLAUDE_CMD%"=="" (
  echo.
  echo [4/4] Instalando o Claude Code...
  powershell -NoProfile -ExecutionPolicy Bypass -Command "irm https://claude.ai/install.ps1 | iex"
  if exist "%USERPROFILE%\.local\bin\claude.exe" set "CLAUDE_CMD=%USERPROFILE%\.local\bin\claude.exe"
) else (
  echo [4/4] Claude Code ja esta instalado.
)

echo.
if "%CLAUDE_CMD%"=="" (
  echo Tudo pronto, so falta abrir o Claude Code. Feche esta janela, abra o Claude Code nesta pasta e escreva: criar o catalogo do meu imovel
  pause
  exit /b
)

echo Tudo pronto! Abrindo o Claude Code. Ele vai te perguntar sobre o seu imovel.
echo.
"%CLAUDE_CMD%" "Crie o catalogo do meu imovel seguindo as instrucoes do arquivo CLAUDE.md desta pasta. Eu nao sei programar: explique tudo em portugues simples e me avise quando eu precisar clicar em Permitir."
pause
