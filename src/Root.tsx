import React from "react";
import { Composition } from "remotion";
import { Livro3D, FPS, T_LIVRO } from "./ReelLivro";
export const Root: React.FC = () => (
  <Composition id="Livro" component={Livro3D} width={1080} height={1920} fps={FPS} durationInFrames={T_LIVRO} />
);
