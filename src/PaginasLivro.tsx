import React from "react";
import dados from "../dados.json";
import { Capa, Varanda, Ficha, Titulo, Rotulo, Fundo, Cartao, base, foto, serif, sans, TERRA, TINTA, CREME } from "./Paginas";

// Cada página do livro é 4:5 (1080x1350), igual às do catálogo em folhas soltas.

// Sala: foto cheia com cartão embaixo
export const PgSala: React.FC = () => {
  const s = dados.paginas.sala;
  return (
    <div style={base}>
      <Fundo src={foto(dados.fotos.sala)} style={{ inset: 0, backgroundPosition: "center 62%" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,0) 55%,rgba(20,12,8,.45) 100%)" }} />
      <Cartao rotulo={s.rotulo} titulo={s.titulo} destaque={s.destaque} style={{ bottom: 70, left: 56 }} />
    </div>
  );
};

// Cozinha: foto cheia com cartão no alto
export const PgCozinha: React.FC = () => {
  const c = dados.paginas.cozinha;
  return (
    <div style={base}>
      <Fundo src={foto(dados.fotos.cozinha)} style={{ inset: 0, backgroundPosition: "center 70%" }} />
      <Cartao rotulo={c.rotulo} titulo={c.titulo} destaque={c.destaque} style={{ top: 64, left: 56 }} />
    </div>
  );
};

// Quarto: foto em cima, texto embaixo sobre o papel creme
export const PgQuarto: React.FC = () => {
  const q = dados.paginas.quartos;
  return (
    <div style={base}>
      <Fundo src={foto(dados.fotos.quarto)} style={{ left: 0, top: 0, width: "100%", height: 850, backgroundPosition: "center 55%" }} />
      <div style={{ position: "absolute", left: 64, right: 64, bottom: 64 }}>
        <Rotulo>{q.rotulo}</Rotulo>
        <div style={{ fontFamily: serif, fontSize: 84, lineHeight: 1, marginTop: 12 }}>
          <Titulo texto={q.titulo} destaque={q.destaque} />
        </div>
        <div style={{ fontFamily: sans, fontSize: 30, lineHeight: 1.4, marginTop: 16, color: "#4b3a31" }}>{q.texto}</div>
      </div>
    </div>
  );
};

// Banheiro: foto cheia com legenda no canto de baixo
export const PgBanheiro: React.FC = () => {
  const b = dados.paginas.banheiro;
  return (
    <div style={base}>
      <Fundo src={foto(dados.fotos.banheiro)} style={{ inset: 0, backgroundPosition: "center 55%" }} />
      <div style={{ position: "absolute", right: 0, bottom: 70, background: CREME, borderRadius: "26px 0 0 26px", padding: "34px 44px 34px 40px", maxWidth: 700, boxShadow: "0 14px 40px rgba(42,30,24,.22)" }}>
        <Rotulo>{b.rotulo}</Rotulo>
        <div style={{ fontFamily: serif, fontSize: 64, lineHeight: 1.02, marginTop: 8 }}>
          <Titulo texto={b.titulo} destaque={b.destaque} />
        </div>
      </div>
    </div>
  );
};

// Ordem do livro: capa, depois seis páginas em três pares, e a ficha na última
export { Capa, Varanda, Ficha };
