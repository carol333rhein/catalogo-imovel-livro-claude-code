# Catálogo de imóvel em livro, feito pelo Claude Code

Um molde para criar um Reels de catálogo de imóvel em formato de livro aberto, com a folha virando, com o título em cima e a chamada para comentar embaixo. Você manda o prompt para o Claude Code, responde as perguntas sobre o seu imóvel, passa as fotos, e ele entrega o vídeo pronto.

**Este efeito é feito com o Claude Code.** O chat comum do Claude não gera o vídeo, porque ele precisa ler e escrever arquivos no seu computador.

## Como usar

1. Baixe o kit (arquivo .zip) e **extraia**: clique com o botão direito no arquivo e escolha "Extrair tudo" (no Mac, dê dois cliques no .zip).
2. Abra a pasta extraída e dê dois cliques em **INSTALAR** (no Mac, `INSTALAR.command`). Ele instala o que faltar (Node.js, bibliotecas, navegador interno e o Claude Code) e abre o Claude Code já pedindo o seu catálogo.
3. O Claude Code pergunta o título do vídeo, a palavra do comentário e os dados do seu imóvel, e pede as fotos. Você só responde e manda as fotos.
4. O vídeo sai em `out/catalogo-imovel-livro.mp4` (1080x1920, 13 segundos).

**Este efeito é feito com o Claude Code.** O chat comum do Claude não gera o vídeo, porque ele precisa ler e escrever arquivos no seu computador. Você precisa de uma conta do Claude com acesso ao Claude Code.

## Boas práticas

- Use só dados **reais** do imóvel. O Claude Code usa o que você informa e não deve inventar nada.
- Fotos **verticais** (ou quadradas) ficam melhores.
- Se as fotos forem criadas por IA, deixe claro no vídeo que o imóvel é ilustrativo.
- Confira o vídeo inteiro antes de postar, principalmente valores e detalhes do imóvel.

## O que tem na pasta

- `INSTALAR.bat` (Windows) e `INSTALAR.command` (Mac): instalam tudo e abrem o Claude Code.
- `CLAUDE.md`: as instruções que o Claude Code lê sozinho ao abrir esta pasta.
- `PROMPT.md`: um prompt alternativo, se você preferir colar direto no Claude Code.
- `dados.json`: os textos e o nome das fotos (o Claude Code preenche este arquivo).
- `public/fotos/`: 7 fotos de exemplo geradas por IA, de um imóvel fictício.
- `src/`: o código do vídeo. Não precisa mexer.

Os efeitos sonoros em `public/sfx/` são de domínio público (CC0).

Feito por Carol Rhein. Uso livre para criar os seus vídeos. Não revenda este molde.
