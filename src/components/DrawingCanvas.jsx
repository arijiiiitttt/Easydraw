import { useEffect, useRef, forwardRef } from 'react';

const DrawingCanvas = forwardRef(({ elements, zoom, onMouseDown, onMouseMove, onMouseUp }, ref) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      draw();
    };

    // Draw function
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;
      const gridSize = 20 * zoom;
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw elements
      ctx.save();
      ctx.scale(zoom, zoom);
      
      elements.forEach(element => {
        ctx.strokeStyle = element.color;
        ctx.lineWidth = element.strokeWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (element.points.length < 1) return;

        ctx.beginPath();
        ctx.moveTo(element.points[0].x, element.points[0].y);

        for (let i = 1; i < element.points.length; i++) {
          ctx.lineTo(element.points[i].x, element.points[i].y);
        }

        ctx.stroke();

        // For shapes (rectangle, ellipse, line)
        if (element.type !== 'pencil' && element.points.length > 1) {
          const start = element.points[0];
          const end = element.points[element.points.length - 1];

          switch (element.type) {
            case 'rectangle':
              const rectX = Math.min(start.x, end.x);
              const rectY = Math.min(start.y, end.y);
              const rectW = Math.abs(end.x - start.x);
              const rectH = Math.abs(end.y - start.y);
              ctx.strokeRect(rectX, rectY, rectW, rectH);
              break;
              
            case 'ellipse':
              const centerX = (start.x + end.x) / 2;
              const centerY = (start.y + end.y) / 2;
              const radiusX = Math.abs(end.x - start.x) / 2;
              const radiusY = Math.abs(end.y - start.y) / 2;
              ctx.beginPath();
              ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
              ctx.stroke();
              break;
              
            case 'line':
              ctx.beginPath();
              ctx.moveTo(start.x, start.y);
              ctx.lineTo(end.x, end.y);
              ctx.stroke();
              break;
          }
        }
      });
      
      ctx.restore();
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    draw();

    return () => window.removeEventListener('resize', updateSize);
  }, [elements, zoom]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full cursor-crosshair"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    />
  );
});

DrawingCanvas.displayName = 'DrawingCanvas';

export default DrawingCanvas;