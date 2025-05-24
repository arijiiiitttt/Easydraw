import React, { useRef, useState } from 'react';
import Toolbar from './Toolbar';
import Canvas from './Canvas';
import { TiExportOutline } from "react-icons/ti";




export default function MainProject() {
  const canvasRef = useRef();
  const [tool, setTool] = useState('pen');

  return (
    <div className="h-screen w-screen flex flex-col bg-white text-black relative overflow-hidden">
      <Toolbar tool={tool} setTool={setTool} canvasRef={canvasRef} />
      <Canvas ref={canvasRef} tool={tool} />

      {/* Zoom Controls */}
      <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-white px-2 py-1 shadow rounded text-sm">
        <button onClick={() => canvasRef.current?.zoomOut()} className="px-2">-</button>
        <span>{canvasRef.current?.getZoom?.().toFixed(0) || 100}%</span>
        <button onClick={() => canvasRef.current?.zoomIn()} className="px-2">+</button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">
        Scroll back to content
      </div>

      {/* Share & Export*/}
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <button
          className="px-4 py-1 bg-indigo-700 text-sm hover:bg-indigo-500 text-white rounded-md shadow"
        >
          Share
        </button>

        <button
          onClick={() => canvasRef.current?.exportAsImage()}
          className="px-4 py-1 flex flex-row items-center justify-center gap-1 bg-gray-200 text-sm text-gray-700 rounded-md shadow"
        >
          <TiExportOutline /> Export
        </button>
      </div>
    </div>
  );
}