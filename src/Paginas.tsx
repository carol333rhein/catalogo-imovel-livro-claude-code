import React from "react";
import { staticFile } from "remotion";
import { loadFont as loadSerif } from "@remotion/google-fonts/DMSerifDisplay";
import { loadFont as loadSans } from "@remotion/google-fonts/Inter";
import dados from "../dados.json";

export const serif = loadSerif("normal", { weights: ["400"] }).fontFamily;
export const serifIt = loadSerif("italic", { weights: ["400"] }).fontFamily;
export const sans = loadSans("normal", { weights: ["500", "600", "700"] }).fontFamily;

export const TERRA = "#CF5C36";
export const TINTA = "#2A1E18";
export const CREME = "#F3EEE6";

export const foto = (nome: string) => staticFile(`fotos/${nome}`);
const W = 1080, H = 1350;

// Escreve um título destacando um trecho em itálico terracota
export const Titulo: React.FC<{ texto: string; destaque: string; cor?: string; corDestaque?: string }> = ({ texto, destaque, cor = TINTA, corDestaque = TERRA }) => {
  const i = texto.indexOf(destaque);
  if (i < 0 || !destaque) return <span style={{ color: cor }}>{texto}</span>;
  return (
    <span style={{ color: cor }}>
      {texto.slice(0, i)}
      <em style={{ color: corDestaque, fontFamily: serifIt, fontStyle: "italic" }}>{destaque}</em>
      {texto.slice(i + destaque.length)}
    </span>
  );
};

export const Rotulo: React.FC<{ children: React.ReactNode; cor?: string }> = ({ children, cor = TERRA }) => (
  <div style={{ fontFamily: sans, fontSize: 22, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600, color: cor }}>{children}</div>
);

export const Fundo: React.FC<{ src: string; style: React.CSSProperties }> = ({ src, style }) => (
  <div style={{ position: "absolute", backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center", ...style }} />
);

export const Cartao: React.FC<{ rotulo: string; titulo: string; destaque: string; style: React.CSSProperties }> = ({ rotulo, titulo, destaque, style }) => (
  <div style={{ position: "absolute", left: 56, background: CREME, borderRadius: 26, padding: "34px 40px", boxShadow: "0 14px 40px rgba(42,30,24,.22)", maxWidth: 640, ...style }}>
    <Rotulo>{rotulo}</Rotulo>
    <div style={{ fontFamily: serif, fontSize: 64, lineHeight: 1.02, marginTop: 8 }}>
      <Titulo texto={titulo} destaque={destaque} />
    </div>
  </div>
);

export const base: React.CSSProperties = { position: "relative", width: W, height: H, overflow: "hidden", background: CREME };

// Página 1: capa
export const Capa: React.FC = () => {
  const im = dados.imovel;
  return (
    <div style={base}>
      <Fundo src={foto(dados.fotos.fachada)} style={{ inset: 0, backgroundPosition: "center 62%" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,.05) 35%,rgba(20,12,8,.78) 100%)" }} />
      <div style={{ position: "absolute", top: 60, right: 60, background: CREME, color: TINTA, padding: "16px 28px", borderRadius: 999, fontFamily: sans, fontWeight: 700, fontSize: 28 }}>{im.valor}</div>
      <div style={{ position: "absolute", left: 70, right: 70, bottom: 80, color: "#fff" }}>
        <Rotulo cor="#F6C9B6">{im.etiqueta}</Rotulo>
        <div style={{ fontFamily: serif, fontSize: 136, lineHeight: 0.95, marginTop: 18 }}>
          <Titulo texto={im.nome} destaque={im.destaqueNome} cor="#fff" corDestaque="#F6C9B6" />
        </div>
        <div style={{ fontFamily: sans, fontSize: 34, marginTop: 22, opacity: 0.92 }}>{im.resumo}</div>
      </div>
    </div>
  );
};

// Página 2: sala e cozinha
export const SalaCozinha: React.FC = () => {
  const p = dados.paginas;
  return (
    <div style={base}>
      <Fundo src={foto(dados.fotos.sala)} style={{ left: 0, top: 0, width: "100%", height: 620, backgroundPosition: "center 70%" }} />
      <Fundo src={foto(dados.fotos.cozinha)} style={{ left: 0, top: 640, width: "100%", height: 710, backgroundPosition: "center 62%" }} />
      <Cartao rotulo={p.sala.rotulo} titulo={p.sala.titulo} destaque={p.sala.destaque} style={{ bottom: 760 }} />
      <Cartao rotulo={p.cozinha.rotulo} titulo={p.cozinha.titulo} destaque={p.cozinha.destaque} style={{ bottom: 56 }} />
    </div>
  );
};

// Página 3: quartos
export const Quartos: React.FC = () => {
  const q = dados.paginas.quartos;
  return (
    <div style={base}>
      <Fundo src={foto(dados.fotos.quarto)} style={{ left: 0, top: 0, width: "100%", height: 700 }} />
      <Fundo src={foto(dados.fotos.banheiro)} style={{ right: 0, bottom: 0, width: 470, height: 560, border: `14px solid ${CREME}`, borderRight: 0, borderBottom: 0, borderRadius: "36px 0 0 0", boxSizing: "border-box" }} />
      <div style={{ position: "absolute", left: 60, bottom: 60, width: 520 }}>
        <Rotulo>{q.rotulo}</Rotulo>
        <div style={{ fontFamily: serif, fontSize: 70, lineHeight: 0.98, marginTop: 10 }}>
          <Titulo texto={q.titulo} destaque={q.destaque} />
        </div>
        <div style={{ fontFamily: sans, fontSize: 30, lineHeight: 1.4, marginTop: 16, color: "#4b3a31" }}>{q.texto}</div>
      </div>
    </div>
  );
};

// Página 4: varanda e lavanderia
export const Varanda: React.FC = () => {
  const v = dados.paginas.varanda;
  return (
    <div style={base}>
      <Fundo src={foto(dados.fotos.varanda)} style={{ left: 0, top: 0, width: "100%", height: 860, backgroundPosition: "center 55%" }} />
      <Fundo src={foto(dados.fotos.lavanderia)} style={{ left: 56, bottom: 56, width: 430, height: 520, borderRadius: 30, border: `12px solid ${CREME}`, boxShadow: "0 14px 40px rgba(42,30,24,.22)", boxSizing: "border-box" }} />
      <div style={{ position: "absolute", right: 56, bottom: 70, width: 470 }}>
        <Rotulo>{v.rotulo}</Rotulo>
        <div style={{ fontFamily: serif, fontSize: 76, lineHeight: 1, marginTop: 10 }}>
          <Titulo texto={v.titulo} destaque={v.destaque} />
        </div>
        <div style={{ fontFamily: sans, fontSize: 28, lineHeight: 1.4, marginTop: 14, color: "#4b3a31" }}>{v.texto}</div>
      </div>
    </div>
  );
};

// Página 5: ficha do imóvel
export const Ficha: React.FC = () => {
  const im = dados.imovel;
  const itens = [
    { n: im.quartos, t: "quartos" },
    { n: im.suites, t: "suíte" },
    { n: im.vagas, t: "vagas na garagem" },
    { n: im.proximidade.numero, t: im.proximidade.texto },
  ];
  return (
    <div style={{ ...base, background: TINTA, color: CREME, padding: "90px 70px", boxSizing: "border-box" }}>
      <Rotulo cor="#F0A78C">Resumo do imóvel</Rotulo>
      <div style={{ fontFamily: serif, fontSize: 104, lineHeight: 0.98, marginTop: 16 }}>
        <Titulo texto={im.nome} destaque={im.destaqueNome} cor="#fff" corDestaque="#F0A78C" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginTop: 64 }}>
        {itens.map((x, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,.07)", borderRadius: 24, padding: "32px 30px" }}>
            <div style={{ fontFamily: serif, fontSize: 84, lineHeight: 1, color: "#F0A78C" }}>{x.n}</div>
            <div style={{ fontFamily: sans, fontSize: 27, marginTop: 10, opacity: 0.9 }}>{x.t}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 44, borderTop: "2px solid rgba(255,255,255,.25)", paddingTop: 36, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div style={{ fontFamily: sans, fontSize: 26, opacity: 0.85 }}>Valor</div>
          <div style={{ fontFamily: serif, fontSize: 112, color: "#fff", lineHeight: 1 }}>{im.valorCurto}</div>
        </div>
        <div style={{ fontFamily: sans, fontSize: 26, opacity: 0.85 }}>{im.bairro}</div>
      </div>
      <div style={{ position: "absolute", left: 70, bottom: 50, fontFamily: sans, fontSize: 22, opacity: 0.6 }}>{im.aviso}</div>
    </div>
  );
};

export const PAGINAS = [Capa, SalaCozinha, Quartos, Varanda, Ficha];
export const LARGURA = W;
export const ALTURA = H;
