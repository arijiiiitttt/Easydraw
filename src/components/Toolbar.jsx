import React from 'react';
import {
  FaMousePointer, FaHandPaper, FaSquare, FaCircle, FaArrowRight,
  FaPencilAlt, FaEraser, FaFont, FaImage
} from 'react-icons/fa';

const tools = [
  { name: 'select', icon: FaMousePointer },
  { name: 'hand', icon: FaHandPaper },
  { name: 'rectangle', icon: FaSquare },
  { name: 'circle', icon: FaCircle },
  { name: 'arrow', icon: FaArrowRight },
  { name: 'pen', icon: FaPencilAlt },
  { name: 'eraser', icon: FaEraser },
  { name: 'text', icon: FaFont },
  { name: 'image', icon: FaImage },
];

export default function Toolbar({ tool, setTool }) {
  return (
    <div className="absolute text-sm top-4 left-1/2 transform -translate-x-1/2 bg-white shadow-sm rounded-xl px-4 py-2 flex items-center gap-3 z-10">
      {tools.map(({ name, icon: Icon }) => (
        <button
          key={name}
          onClick={() => setTool(name)}
          className={`p-2 rounded-full   ${tool === name ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100'}`}
        >
          <Icon className="text-lg" />
        </button>
      ))}
    </div>
  );
}