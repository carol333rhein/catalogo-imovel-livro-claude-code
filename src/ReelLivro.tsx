import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import dados from "../dados.json";
import { serif, serifIt, sans, TERRA, TINTA, CREME, LARGURA, ALTURA } from "./Paginas";
import { Capa, Varanda, Ficha, PgSala, PgCozinha, PgQuarto, PgBanheiro } from "./PaginasLivro";

export const FPS = 30;
export const T_LIVRO = 390; // 13 segundos

const PW = 520, PH = 650; // cada página do livro (4:5)
const ESC = PW / LARGURA;

// Folhas: frente = página da direita, verso = página da esquerda do par seguinte
const FOLHAS: { frente: React.FC; verso: React.FC | null }[] = [
  { frente: Capa, verso: PgSala },
  { frente: PgCozinha, verso: PgQuarto },
  { frente: PgBanheiro, verso: Varanda },
  { frente: Ficha, verso: null },
];
// segundo em que cada folha começa a virar (a última não vira)
const T0 = [0.3, 2.6, 4.9];
const TURN = 1.05;
const CTA_FRAME = 165; // a chamada entra aos 5,5 s

const cl = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const pr = (t: number, a: number, b: number) => cl((t - a) / (b - a));
const eo = (x: number) => 1 - Math.pow(1 - x, 3);
const eio = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

const Gancho: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const texto = dados.titulo;
  const dest = dados.destaque || "";
  const i = dest ? texto.indexOf(dest) : -1;
  let pos = 0;
  const palavras = texto.split(" ").map((t) => {
    const ini = pos; pos += t.length + 1;
    return { t, d: i >= 0 && ini >= i && ini < i + dest.length };
  });
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: 330, textAlign: "center", fontSize: 82, lineHeight: 1.08, color: TINTA, fontFamily: serif }}>
      {palavras.map((p, k) => {
        const s = spring({ frame: f - 4 - k * 3, fps, config: { damping: 16, stiffness: 160 } });
        return (
          <span key={k} style={{ display: "inline-block", marginRight: 18, opacity: s, transform: `translateY(${(1 - s) * 26}px)`, color: p.d ? TERRA : TINTA, fontFamily: p.d ? serifIt : serif }}>{p.t}</span>
        );
      })}
    </div>
  );
};

const Face: React.FC<{ Comp: React.FC | null; lado: "frente" | "verso"; turno: number }> = ({ Comp, lado, turno }) => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden", backfaceVisibility: "hidden", transform: lado === "verso" ? "rotateY(180deg)" : undefined }}>
    {Comp ? (
      <div style={{ width: LARGURA, height: ALTURA, transform: `scale(${ESC})`, transformOrigin: "top left" }}><Comp /></div>
    ) : (
      <div style={{ position: "absolute", inset: 0, background: "#E9E1D3" }} />
    )}
    {/* sombra perto da lombada, como em livro de verdade */}
    <div style={{ position: "absolute", inset: 0, background: lado === "frente" ? "linear-gradient(90deg,rgba(0,0,0,.30),rgba(0,0,0,0) 9%)" : "linear-gradient(270deg,rgba(0,0,0,.30),rgba(0,0,0,0) 9%)" }} />
    {/* escurece enquanto a folha vira */}
    <div style={{ position: "absolute", inset: 0, background: "#000", opacity: turno }} />
  </div>
);

const Folha: React.FC<{ i: number; t: number }> = ({ i, t }) => {
  const F = FOLHAS[i];
  const q = i < T0.length ? eio(pr(t, T0[i], T0[i] + TURN)) : 0;
  const s = Math.sin(Math.PI * q);
  return (
    <div style={{ position: "absolute", left: PW, top: 0, width: PW, height: PH, transformOrigin: "0 50%", transformStyle: "preserve-3d", transform: `rotateY(${-180 * q}deg)`, zIndex: q < 0.5 ? 100 - i : 200 + i }}>
      <Face Comp={F.frente} lado="frente" turno={0.4 * s * (q < 0.5 ? 1 : 0)} />
      <Face Comp={F.verso} lado="verso" turno={0.4 * s * (q >= 0.5 ? 1 : 0)} />
    </div>
  );
};

const Livro: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const { fps } = useVideoConfig();
  const entra = spring({ frame: f - 6, fps, config: { damping: 15, stiffness: 120 } });
  const zoom = 1.06 - 0.06 * eio(pr(t, 0, 6));
  const flutua = Math.sin(f / 28) * 3;
  return (
    <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 50%" }}>
      {/* sombra no chão */}
      <div style={{ position: "absolute", left: 40, top: 1360, width: 1000, height: 90, borderRadius: "50%", background: "radial-gradient(ellipse at center,rgba(42,30,24,.45),rgba(42,30,24,0) 70%)", filter: "blur(8px)", opacity: entra }} />
      <div style={{ position: "absolute", left: 20, top: 670, width: 1040, height: PH, perspective: 2600, transformStyle: "preserve-3d", opacity: entra, transform: `translateY(${(1 - entra) * 80 + flutua}px) rotateX(3deg) scale(${0.92 + 0.08 * entra})` }}>
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          {FOLHAS.map((_, i) => <Folha key={i} i={i} t={t} />)}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Resumo: React.FC = () => {
  const f = useCurrentFrame();
  const q = eo(pr(f / FPS, 0.5, 1.2)) * (1 - pr(f / FPS, 5.2, 5.7));
  const im = dados.imovel;
  const itens = [
    { n: im.quartos, t: "quartos" },
    { n: im.suites, t: "suíte" },
    { n: im.vagas, t: "vagas" },
  ];
  return (
    <div style={{ position: "absolute", left: 80, right: 80, top: 1475, display: "flex", justifyContent: "center", opacity: q, transform: `translateY(${(1 - q) * 20}px)` }}>
      {itens.map((x, i) => (
        <div key={i} style={{ flex: 1, textAlign: "center", borderLeft: i ? "1.5px solid rgba(207,92,54,.4)" : "none" }}>
          <div style={{ fontFamily: serif, fontSize: 58, color: TERRA, lineHeight: 1.05 }}>{x.n}</div>
          <div style={{ fontFamily: sans, fontSize: 28, color: TINTA, marginTop: 6 }}>{x.t}</div>
        </div>
      ))}
    </div>
  );
};

const Chamada: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f, fps, config: { damping: 14, stiffness: 130 } });
  const brilho = 0.5 + 0.5 * Math.sin(f / 8);
  return (
    <div style={{ position: "absolute", left: 70, right: 70, top: 1465, textAlign: "center", opacity: Math.min(1, s * 1.4), transform: `translateY(${(1 - s) * 70}px)` }}>
      <div style={{ fontFamily: sans, fontWeight: 600, fontSize: 38, color: TINTA }}>{dados.chamada}</div>
      <div style={{ marginTop: 14, display: "inline-block", background: TERRA, color: "#fff", fontFamily: sans, fontWeight: 700, fontSize: 56, padding: "18px 46px", borderRadius: 999, boxShadow: `0 12px ${28 + brilho * 14}px rgba(207,92,54,${0.35 + brilho * 0.2})` }}>
        Comenta <span style={{ letterSpacing: 2 }}>{dados.palavra}</span>
      </div>
    </div>
  );
};

export const Livro3D: React.FC = () => (
  <AbsoluteFill style={{ background: `radial-gradient(120% 90% at 50% 40%, #FBF8F2 0%, ${CREME} 55%, #E6DDD0 100%)` }}>
    <Gancho />
    <Livro />
    <Resumo />
    <Sequence from={CTA_FRAME}><Chamada /></Sequence>
    {T0.map((v) => (
      <Sequence key={v} from={Math.round(v * FPS) - 2}><Audio src={staticFile("sfx/folha.wav")} volume={0.5} /></Sequence>
    ))}
    <Sequence from={CTA_FRAME}><Audio src={staticFile("sfx/pop.wav")} volume={0.5} /></Sequence>
  </AbsoluteFill>
);
