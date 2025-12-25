"use client";

import React, { useEffect, useRef } from "react";

interface InteractiveSpiralProps {
  className?: string;
}

const vertexShaderSource = `
attribute vec2 a_position;
void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
#ifdef GL_ES
precision highp float;
#endif
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 palette_fire(float t, float factor) {
    vec3 a = vec3(0.5, 0.1, 0.0);
    vec3 b = vec3(0.6, 0.3, 0.1);
    vec3 c = vec3(1.0, 1.0, 0.0);
    vec3 d = vec3(0.8, 0.7, 0.2);

    a += 0.1 * sin(vec3(0.1, 0.2, 0.3) * factor);
    b += 0.2 * cos(vec3(0.2, 0.3, 0.1) * factor);

    return a + b * cos(6.28318 * (c * t + d));
}

void main() {
    vec2 st = (gl_FragCoord.xy / u_resolution.xy) * 2.0 - 1.0;
    st.x *= u_resolution.x / u_resolution.y;
    vec3 color = vec3(0.0);

    vec2 mouse_st = vec2(u_mouse.x, u_resolution.y - u_mouse.y) / u_resolution.xy;
    mouse_st = (mouse_st * 2.0 - 1.0) * vec2(1.0, -1.0);
    mouse_st.x *= u_resolution.x / u_resolution.y;

    vec2 mouse_vec = st - mouse_st;
    float mouse_dist = length(mouse_vec);
    float mouse_push = smoothstep(0.7, 0.0, mouse_dist) * 0.5;

    if (u_mouse.x > 0.0) {
        st += normalize(mouse_vec) * mouse_push;
    }

    float R_global = length(st);
    float angle_global = atan(st.y, st.x);
    float twist = 0.5 * sin(R_global * 3.0 - u_time * 0.4);
    st *= mat2(cos(twist), sin(twist), -sin(twist), cos(twist));

    for (float i = 1.0; i < 6.0; i++) {
        vec2 st0 = st;
        float sgn = 1.0 - 2.0 * mod(i, 2.0);

        float t = u_time * 0.02 - float(i);
        st0 *= mat2(cos(t), sin(t), -sin(t), cos(t));

        float R = length(st0);
        float d = R * i;
        float angle = atan(st0.y, st0.x);
        float num_arms = 4.0 + 3.0 * sin(u_time * 0.1 + i);
        float angle_warped = angle * num_arms;
        float dist_warp_factor = 1.0 + 0.3 * sin(angle * 12.0 + u_time * 0.5 - i);
        float d_warped = d * dist_warp_factor;

        vec3 pal = palette_fire(-exp((length(d_warped) * -0.9)), abs(d_warped) * 0.4);
        float radial = exp(-R);
        radial *= smoothstep(1.2, 0.5, R);
        pal *= radial;
        float phase = -(d_warped + sgn * angle_warped) + u_time * 0.3;

        float v = sin(phase);
        v = max(abs(v), 0.01);
        float w = pow(0.02 / v, 0.8);
        color += pal * w;
    }

    gl_FragColor = vec4(color, 1.0);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile failed", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link failed", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

const InteractiveSpiral: React.FC<InteractiveSpiralProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;

    const positionBuffer = gl.createBuffer();
    if (!positionBuffer) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
        1.0, -1.0,
        -1.0, 1.0,
        1.0, 1.0,
      ]),
      gl.STATIC_DRAW
    );

    gl.useProgram(program);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    if (positionLocation === -1) return;
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const mouseLocation = gl.getUniformLocation(program, "u_mouse");
    if (!resolutionLocation || !timeLocation || !mouseLocation) return;

    let mouseX = -1;
    let mouseY = -1;
    let devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    let rafId = 0;

    const resize = () => {
      devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.floor(canvas.clientWidth * devicePixelRatio));
      const height = Math.max(1, Math.floor(canvas.clientHeight * devicePixelRatio));
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const render = (time: number) => {
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, time * 0.001);
      gl.uniform2f(mouseLocation, mouseX * devicePixelRatio, mouseY * devicePixelRatio);

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      rafId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <div className={className ?? "relative h-96 w-full"}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};

export default InteractiveSpiral;
