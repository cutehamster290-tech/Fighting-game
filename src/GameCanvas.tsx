// GameCanvas.tsx
import React, { useRef, useEffect } from 'react';
import type { Stickman, GameState } from './types';

interface GameCanvasProps {
  gameState: GameState;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({ gameState }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Disegna un singolo stickman
  const drawStickman = (ctx: CanvasRenderingContext2D, sm: Stickman) => {
    const { x, y } = sm.position;
    ctx.strokeStyle = sm.color;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    // Testa
    ctx.beginPath();
    ctx.arc(x, y - 20, 10, 0, Math.PI * 2);
    ctx.stroke();

    // Corpo
    ctx.beginPath();
    ctx.moveTo(x, y - 10);
    ctx.lineTo(x, y + 10);
    ctx.stroke();

    // Braccia
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 15, y + 10); // Braccio sx
    ctx.moveTo(x, y);
    ctx.lineTo(x + 15, y + 10); // Braccio dx
    ctx.stroke();

    // Gambe
    ctx.beginPath();
    ctx.moveTo(x, y + 10);
    ctx.lineTo(x - 10, y + 30); // Gamba sx
    ctx.moveTo(x, y + 10);
    ctx.lineTo(x + 10, y + 30); // Gamba dx
    ctx.stroke();

    // Barra vita
    ctx.fillStyle = 'red';
    ctx.fillRect(x - 20, y - 40, (sm.health / 100) * 40, 5);
  };

  // Loop di rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    let animationFrameId: number;

    const render = () => {
      if (!ctx || !canvas) return;
      // Pulisci il canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Disegna tutti gli stickman
      gameState.stickmen.forEach(sm => drawStickman(ctx, sm));

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameState]); // Rerenderizza quando cambia lo stato del gioco

  return <canvas ref={canvasRef} width={800} height={600} style={{ background: '#f0f0f0' }} />;
};