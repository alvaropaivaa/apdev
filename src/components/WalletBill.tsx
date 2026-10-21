import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../lib/gsap";

/*
 * Nota de dinheiro "de papel" em WebGL: a imagem vira uma malha que se curva e
 * ondula a partir da borda da carteira, com sombreado nas dobras e um brilho de
 * luz passando. Sem WebGL (ou com "reduzir movimento"), fica a imagem parada.
 *
 * Coordenadas em pixels da textura (wallet-bill.webp, 726x500).
 */
const TEX_W = 726;
const TEX_H = 500;
/** Folga ao redor da textura para a nota poder se mexer sem ser cortada (igual ao CSS). */
const MARGIN = 48;
const COLS = 48;
const ROWS = 32;
/** Direção "para cima" (para fora da carteira) e "para o lado" da nota na foto. */
const UP: [number, number] = [-0.229, -0.973];
/** Borda da carteira (reta aproximada) e altura visível usada para normalizar. */
const RIM_A: [number, number] = [46, 423];
const RIM_B: [number, number] = [584, 343];
const FREE_LENGTH = 300;
/** Canto superior esquerdo e direito da nota (para a coordenada "ao longo da largura"). */
const TOP_LEFT: [number, number] = [13, 268];
const TOP_RIGHT: [number, number] = [586, 8];

const VERTEX = `
attribute vec2 a_pos;
attribute float a_h;
attribute float a_s;
uniform float u_t;
uniform float u_amp;
varying vec2 v_uv;
varying float v_shade;
varying float v_sheen;
const vec2 UP = vec2(${UP[0]}, ${UP[1]});
const vec2 SIDE = vec2(0.911, -0.413);
const vec2 ROOT = vec2(354.0, 380.0);
const vec2 MARGIN = vec2(${MARGIN}.0);
const vec2 CANVAS = vec2(${TEX_W + MARGIN * 2}.0, ${TEX_H + MARGIN * 2}.0);
void main() {
  float h = a_h;
  float h2 = h * h;
  float t = u_t;

  // Balanço lento: a parte solta da nota se curva para os lados a partir da carteira.
  float sway = sin(t * 1.1) * 0.6 + sin(t * 1.93 + 0.8) * 0.4;
  float ang = 0.05 * sway * h * u_amp;
  vec2 rel = a_pos - ROOT;
  vec2 p = ROOT + vec2(rel.x * cos(ang) - rel.y * sin(ang), rel.x * sin(ang) + rel.y * cos(ang));

  // Ondas de vento atravessando a nota (o papel dobra para frente e para trás).
  float p1 = a_s * 5.5 - t * 3.0;
  float p2 = a_s * 9.0 - t * 4.4 + 1.3;
  float wave = sin(p1) * 0.65 + sin(p2) * 0.35;
  float slope = cos(p1) * 0.65 * 5.5 + cos(p2) * 0.35 * 9.0;
  float gust = 0.75 + 0.25 * sin(t * 0.7);
  p += UP * (wave * 9.0 * h2 * gust * u_amp);
  p += SIDE * (sin(t * 1.6 + a_s * 2.2) * 3.0 * h2 * u_amp);

  v_uv = a_pos / vec2(${TEX_W}.0, ${TEX_H}.0);
  v_shade = clamp(1.0 + slope * 0.03 * h * gust * u_amp, 0.8, 1.2);
  // Faixa de brilho atravessando a nota de tempos em tempos.
  float band = fract(t * 0.11) * 2.4 - 0.7;
  v_sheen = smoothstep(0.14, 0.0, abs(a_s + h * 0.3 - band)) * 0.2 * u_amp;

  vec2 clip = (p + MARGIN) / CANVAS * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
}`;

const FRAGMENT = `
precision mediump float;
uniform sampler2D u_tex;
varying vec2 v_uv;
varying float v_shade;
varying float v_sheen;
void main() {
  vec4 c = texture2D(u_tex, v_uv);
  vec3 rgb = c.rgb * v_shade + vec3(v_sheen) * c.a;
  gl_FragColor = vec4(min(rgb, vec3(c.a)), c.a);
}`;

/** Altura acima da borda da carteira (0 dentro dela) e posição ao longo da largura (0..1). */
function billCoords(x: number, y: number) {
  // Resolve p - k*UP = RIM_A + t*(RIM_B - RIM_A) para achar a distância k até a borda.
  const rx = RIM_B[0] - RIM_A[0];
  const ry = RIM_B[1] - RIM_A[1];
  const det = -UP[0] * ry + UP[1] * rx;
  const dx = x - RIM_A[0];
  const dy = y - RIM_A[1];
  const k = (dx * ry - dy * rx) / -det;
  const h = Math.max(0, k / FREE_LENGTH);
  const ex = TOP_RIGHT[0] - TOP_LEFT[0];
  const ey = TOP_RIGHT[1] - TOP_LEFT[1];
  const s = ((x - TOP_LEFT[0]) * ex + (y - TOP_LEFT[1]) * ey) / (ex * ex + ey * ey);
  return { h, s };
}

function buildMesh() {
  const positions: number[] = [];
  const heights: number[] = [];
  const across: number[] = [];
  for (let row = 0; row <= ROWS; row++) {
    for (let col = 0; col <= COLS; col++) {
      const x = (col / COLS) * TEX_W;
      const y = (row / ROWS) * TEX_H;
      const { h, s } = billCoords(x, y);
      positions.push(x, y);
      heights.push(h);
      across.push(s);
    }
  }
  const indices: number[] = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const i = row * (COLS + 1) + col;
      indices.push(i, i + 1, i + COLS + 1, i + 1, i + COLS + 2, i + COLS + 1);
    }
  }
  return { positions, heights, across, indices };
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  console.warn("WalletBill: shader inválido, usando a imagem parada.", gl.getShaderInfoLog(shader));
  return null;
}

export function WalletBill({ src }: { src: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas || prefersReducedMotion()) return;
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: true });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const mesh = buildMesh();
    const buffers: (WebGLBuffer | null)[] = [];
    let texture: WebGLTexture | null = null;
    const attribute = (name: string, data: number[], size: number) => {
      const buffer = gl.createBuffer();
      buffers.push(buffer);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
      const location = gl.getAttribLocation(program, name);
      gl.enableVertexAttribArray(location);
      gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
    };
    attribute("a_pos", mesh.positions, 2);
    attribute("a_h", mesh.heights, 1);
    attribute("a_s", mesh.across, 1);
    const indexBuffer = gl.createBuffer();
    buffers.push(indexBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mesh.indices), gl.STATIC_DRAW);

    const uTime = gl.getUniformLocation(program, "u_t");
    const uAmp = gl.getUniformLocation(program, "u_amp");
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    let frame = 0;
    let visible = false;
    let ready = false;
    let disposed = false;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const draw = (now: number) => {
      // A ventania "liga" suavemente no primeiro segundo.
      const elapsed = (now - start) / 1000;
      gl.uniform1f(uTime, elapsed);
      gl.uniform1f(uAmp, Math.min(1, elapsed / 1.2));
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawElements(gl.TRIANGLES, mesh.indices.length, gl.UNSIGNED_SHORT, 0);
    };
    const loop = (now: number) => {
      draw(now);
      frame = requestAnimationFrame(loop);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      if (ready && visible) frame = requestAnimationFrame(loop);
    };

    // Textura em tamanho potência de 2 para usar mipmaps (borda lisa em qualquer tamanho).
    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      if (disposed) return;
      const pot = document.createElement("canvas");
      pot.width = 1024;
      pot.height = 1024;
      pot.getContext("2d")?.drawImage(image, 0, 0, 1024, 1024);
      texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, pot);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      ready = true;
      resize();
      draw(performance.now());
      root.classList.add("is-webgl");
      sync();
    };
    image.src = src;

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (ready) draw(performance.now());
    });
    resizeObserver.observe(canvas);
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    visibility.observe(canvas);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibility.disconnect();
      root.classList.remove("is-webgl");
      // Libera só os recursos: o canvas pode ser reutilizado (o StrictMode monta duas vezes),
      // e um contexto "perdido" não volta a funcionar no mesmo canvas.
      buffers.forEach((buffer) => gl.deleteBuffer(buffer));
      gl.deleteTexture(texture);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [src]);

  return (
    <div ref={rootRef} className="wallet-bill-render">
      <img className="wallet-bill" src={src} alt="" loading="lazy" decoding="async" draggable={false} />
      <canvas ref={canvasRef} className="wallet-bill-canvas" aria-hidden="true" />
    </div>
  );
}
