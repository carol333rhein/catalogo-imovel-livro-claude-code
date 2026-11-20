#!/bin/bash
# Catálogo de imóvel com o Claude Code: instala o que falta e abre o Claude Code (Mac)
cd "$(dirname "$0")" || exit 1
echo "=== Catálogo de imóvel com o Claude Code ==="

if [ ! -f package.json ]; then
  echo "Este arquivo ainda está dentro do .zip. Descompacte (dois cliques no .zip) e abra o INSTALAR.command da pasta nova."
  read -p "Tecle Enter para fechar..."; exit 1
fi

if ! command -v node >/dev/null 2>&1; then
  echo "[1/4] Instalando o Node.js (só na primeira vez)..."
  if command -v brew >/dev/null 2>&1; then
    brew install node
  else
    echo "Instale o Node.js LTS em https://nodejs.org, feche esta janela e abra o INSTALAR.command de novo."
    read -p "Tecle Enter para fechar..."; exit 1
  fi
else
  echo "[1/4] Node.js já está instalado."
fi

echo "[2/4] Preparando o vídeo (pode demorar alguns minutos)..."
npm install || { echo "Deu erro. Confira sua internet e abra o INSTALAR.command de novo."; read -p "Tecle Enter..."; exit 1; }

echo "[3/4] Baixando o navegador interno que gera o vídeo..."
npx remotion browser ensure

export PATH="$HOME/.local/bin:$PATH"
if ! command -v claude >/dev/null 2>&1; then
  echo "[4/4] Instalando o Claude Code..."
  curl -fsSL https://claude.ai/install.sh | bash
  export PATH="$HOME/.local/bin:$PATH"
else
  echo "[4/4] Claude Code já está instalado."
fi

echo ""
echo "Tudo pronto! Abrindo o Claude Code. Ele vai te perguntar sobre o seu imóvel."
claude "Crie o catálogo do meu imóvel seguindo as instruções do arquivo CLAUDE.md desta pasta. Eu não sei programar: explique tudo em português simples e me avise quando eu precisar clicar em Permitir."
