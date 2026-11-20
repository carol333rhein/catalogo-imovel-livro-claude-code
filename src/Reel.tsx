import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import dados from "../dados.json";
import { PAGINAS, LARGURA, ALTURA, serif, serifIt, sans, TERRA, TINTA, CREME } from "./Paginas";

export const FPS = 30;
export const T_REEL = 420; // 14 segundos

// A cada 2 segundos uma página vira (frame de início de cada virada)
const VIRADAS = [78, 138, 198, 258];
const DUR_VIRADA = 26;
const CTA_FRAME = 150; // a chamada aparece aos 5 segundos

// Título no topo, palavra por palavra, com o trecho em destaque em terracota
const Gancho: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const texto = dados.titulo;
  const dest = dados.destaque || "";
  const i = dest ? texto.indexOf(dest) : -1;
  const palavras = texto.split(" ").map((t) => ({ t }));
  let pos = 0;
  const com = palavras.map((p) => {
    const ini = pos;
    pos += p.t.length + 1;
    const destaque = i >= 0 && ini >= i && ini < i + dest.length;
    return { ...p, destaque };
  });
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: 150, textAlign: "center", fontSize: 82, lineHeight: 1.08, color: TINTA, fontFamily: serif }}>
      {com.map((p, k) => {
        const s = spring({ frame: f - 4 - k * 3, fps, config: { damping: 16, stiffness: 160 } });
        return (
          <span key={k} style={{ display: "inline-block", marginRight: 18, opacity: s, transform: `translateY(${(1 - s) * 26}px)`, color: p.destaque ? TERRA : TINTA, fontFamily: p.destaque ? serifIt : serif }}>
            {p.t}
          </span>
        );
      })}
    </div>
  );
};

const Pagina: React.FC<{ i: number }> = ({ i }) => {
  const f = useCurrentFrame();
  const Comp = PAGINAS[i];
  const ini = i < VIRADAS.length ? VIRADAS[i] : 99999;
  const p = interpolate(f, [ini, ini + DUR_VIRADA], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const prev = i > 0 ? VIRADAS[i - 1] : -1;
  const pp = i > 0 ? interpolate(f, [prev, prev + DUR_VIRADA], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
  const esc = 860 / LARGURA;
  return (
    <div style={{ position: "absolute", inset: 0, transformOrigin: "left center", transform: `rotateY(${-178 * p}deg)`, backfaceVisibility: "hidden", zIndex: 10 - i, opacity: p >= 0.995 ? 0 : 1, borderRadius: 10, overflow: "hidden" }}>
      <div style={{ width: LARGURA, height: ALTURA, transform: `scale(${esc})`, transformOrigin: "top left" }}>
        <Comp />
      </div>
      <div style={{ position: "absolute", inset: 0, background: `rgba(20,10,5,${0.38 * pp})` }} />
    </div>
  );
};

const Livro: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f - 14, fps, config: { damping: 15, stiffness: 120 } });
  const flutua = Math.sin(f / 22) * 4;
  return (
    <div style={{ position: "absolute", left: 110, top: 520, width: 860, height: 1075, perspective: 2600, transform: `translateY(${(1 - s) * 90 + flutua}px) scale(${0.9 + 0.1 * s}) rotate(${(1 - s) * -3}deg)`, opacity: s }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 12, boxShadow: "0 40px 80px rgba(42,30,24,.35), 0 8px 20px rgba(42,30,24,.25)" }} />
      <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
        {[4, 3, 2, 1, 0].map((i) => <Pagina key={i} i={i} />)}
      </div>
    </div>
  );
};

const Chamada: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f, fps, config: { damping: 14, stiffness: 130 } });
  const brilho = 0.5 + 0.5 * Math.sin(f / 8);
  return (
    <div style={{ position: "absolute", left: 70, right: 70, top: 1650, textAlign: "center", opacity: Math.min(1, s * 1.4), transform: `translateY(${(1 - s) * 70}px)` }}>
      <div style={{ fontFamily: sans, fontWeight: 600, fontSize: 38, color: TINTA }}>{dados.chamada}</div>
      <div style={{ marginTop: 14, display: "inline-block", background: TERRA, color: "#fff", fontFamily: sans, fontWeight: 700, fontSize: 56, padding: "18px 46px", borderRadius: 999, boxShadow: `0 12px ${28 + brilho * 14}px rgba(207,92,54,${0.35 + brilho * 0.2})` }}>
        Comenta <span style={{ letterSpacing: 2 }}>{dados.palavra}</span>
      </div>
    </div>
  );
};

export const Reel: React.FC = () => (
  <AbsoluteFill style={{ background: `radial-gradient(120% 90% at 50% 40%, #FBF8F2 0%, ${CREME} 55%, #E6DDD0 100%)` }}>
    <Gancho />
    <Livro />
    <Sequence from={CTA_FRAME}><Chamada /></Sequence>
    {VIRADAS.map((v) => (
      <Sequence key={v} from={v - 2}><Audio src={staticFile("sfx/folha.wav")} volume={0.5} /></Sequence>
    ))}
    <Sequence from={CTA_FRAME}><Audio src={staticFile("sfx/pop.wav")} volume={0.5} /></Sequence>
  </AbsoluteFill>
);
