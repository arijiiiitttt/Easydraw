import React, { useEffect, useImperativeHandle, useRef, forwardRef } from 'react';

const Canvas = forwardRef(({ tool }, ref) => {
  const canvasRef = useRef();
  const ctxRef = useRef();
  const isDrawing = useRef(false);
  const lastPoint = useRef({ x: 0, y: 0 });
  const zoom = useRef(1);

  useImperativeHandle(ref, () => ({
    zoomIn: () => {
      zoom.current *= 1.1;
      redraw();
    },
    zoomOut: () => {
      zoom.current /= 1.1;
      redraw();
    },
    getZoom: () => zoom.current * 100,
    exportAsImage: () => {
      const url = canvasRef.current.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'drawing.png';
      link.href = url;
      link.click();
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 3000;
    canvas.height = 3000;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#111';
    ctxRef.current = ctx;
  }, []);

  const getMouse = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / zoom.current,
      y: (e.clientY - rect.top) / zoom.current,
    };
  };

  const redraw = () => {
    const ctx = ctxRef.current;
    ctx.setTransform(zoom.current, 0, 0, zoom.current, 0, 0);
  };

  const handleMouseDown = (e) => {
    const { x, y } = getMouse(e);
    lastPoint.current = { x, y };
    isDrawing.current = true;
    if (tool === 'pen' || tool === 'eraser') {
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(x, y);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;
    const { x, y } = getMouse(e);
    const ctx = ctxRef.current;

    if (tool === 'pen') {
      ctx.strokeStyle = '#111';
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (tool === 'eraser') {
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 10;
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const handleMouseUp = (e) => {
    isDrawing.current = false;
    ctxRef.current.closePath();
  };

  return (
    <div className="flex-1 relative overflow-auto bg-white cursor-crosshair">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
});

export default Canvas;
