import React, { useEffect, useRef } from 'react';
import './styles.css';


const MatrixRain: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;
  
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  
      const letters = '01';
      const fontSize = 16;
      const columns = Math.floor(canvas.width / fontSize);
      
      const rainDrops: number[] = Array(columns).fill(1);
  
      const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
  
        ctx.fillStyle = '#0F0';
        ctx.font = `${fontSize}px monospace`;
  
        for (let i = 0; i < rainDrops.length; i++) {
          const text = letters.charAt(Math.floor(Math.random() * letters.length));
          ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
  
          if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
          }
  
          rainDrops[i]++;
        }
      };
  
      const interval = setInterval(draw, 50);
      return () => clearInterval(interval);
    }, []);
  
    return <canvas ref={canvasRef} id="matrix-canvas"></canvas>;
  };
  
  export default MatrixRain;