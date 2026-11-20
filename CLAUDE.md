# Instruções para o Claude Code: criar o catálogo de imóvel de quem está usando

Para você, Claude: a pessoa não sabe programar. Explique cada etapa em uma frase simples e avise quando ela precisar clicar em Permitir.

## Etapa 0. Ignore a pasta atual (se ela não for esta)
Se o app estiver aberto dentro de uma pasta de projeto (código ou outro trabalho), ignore essa pasta: não instale nada nela e não leia o conteúdo dela. Trabalhe só na pasta deste kit. Se a pessoa abriu o Claude Code pelo instalador (INSTALAR), você já está na pasta certa e as bibliotecas já estão instaladas.

Esta pasta é um molde (Remotion) que gera um Reels vertical de 13 segundos: o título em cima, um catálogo de imóvel em formato de livro aberto, com a folha virando em 3D, no meio e, depois de 5 segundos, a chamada para comentar uma palavra embaixo.

Se a pessoa só colou o link do kit, baixe você mesmo (por exemplo `curl -L -o kit.zip <link>`, sem precisar de Git), numa pasta nova dentro da pasta atual. Se você recebeu este kit ainda em .zip, descompacte (Windows: `tar -xf arquivo.zip` ou `Expand-Archive`; Mac: `unzip`) e trabalhe dentro da pasta descompactada. Se a pessoa já mandou as fotos ou informações junto, use-as.

Quem está usando quer o catálogo do **próprio imóvel**. Sua tarefa é pegar as informações e as fotos dessa pessoa e gerar o vídeo.

## O que fazer, nesta ordem

0. **Prepare o computador, sem pedir trabalho para a pessoa.** Rode `node -v`. Se o Node.js não estiver instalado, peça autorização e instale: no Windows `winget install -e --id OpenJS.NodeJS.LTS`, no Mac `brew install node` (ou oriente a baixar o LTS em nodejs.org). Se acabou de instalar o Node, avise que ela precisa fechar e abrir o Claude Code de novo nesta pasta e colar o prompt outra vez. Depois rode `npm install` e `npx remotion browser ensure` (na primeira vez demora uns minutos: avise). Se tudo isso já estiver instalado, siga direto.

1. **Pergunte tudo de uma vez só, em linguagem simples.** (a) O **título do vídeo**: a frase que aparece no topo; sugira 2 ou 3 opções para quem não souber, no estilo "Agora o Claude Code faz um catálogo da sua casa, do seu imóvel." (b) A **palavra do comentário**: curta, sem acento. (c) Os dados do imóvel: nome, bairro, valor, quartos, suítes, vagas, o que fica perto e uma frase curta para sala, cozinha, quartos, banheiro e varanda.
2. **Peça as fotos.** Fachada, sala, cozinha, quarto, banheiro, lavanderia e varanda. Copie para `public/fotos/` (pode converter para .jpg) e atualize o nome de cada uma em `dados.json`, no campo `fotos`. Se faltar alguma, use a mais parecida e avise. Prefira fotos verticais.
3. **Preencha o `dados.json`.** Título, destaque (o trecho do título que vai em cor), palavra, dados do imóvel e textos das páginas. Escreva em português do Brasil, sem travessão, e com frases curtas para caber no vídeo. O campo `imovel.aviso` só deve ficar se as fotos forem de IA ("Imóvel ilustrativo..."); se forem fotos reais, deixe vazio.
4. **Gere o vídeo.** Na primeira vez rode `npm install`. Depois `npm run render`. Para conferir um quadro antes: `npm run quadro`.
5. **Abra o vídeo** `out/catalogo-imovel-livro.mp4` e mostre para a pessoa. Se algum texto ficar cortado ou apertado, encurte no `dados.json` e renderize de novo.

## Regras

- **Nunca invente dado do imóvel.** Valor, metragem, quartos, bairro: só o que a pessoa informar. O que não souber, deixe de fora.
- Só altere `dados.json` e a pasta `public/fotos/`. Não mexa no código de `src/`.
- Todo texto sem travessão e em português do Brasil.
- Se algo falhar na instalação, a pessoa pode rodar o instalador de reserva (`INSTALAR.bat` no Windows ou `instalar.sh` no Mac).
- Antes de a pessoa postar, lembre-a de conferir valores e fotos no vídeo.
