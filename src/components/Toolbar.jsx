import React from 'react';
import { LiaMousePointerSolid } from "react-icons/lia";
import { RxHand } from "react-icons/rx";
import { PiRectangle } from "react-icons/pi";
import { GoCircle } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
import { BsPencil } from "react-icons/bs";
import { LuEraser } from "react-icons/lu";
import { RxLetterCaseCapitalize } from "react-icons/rx";
import { CiImageOn } from "react-icons/ci";



const tools = [
  { name: 'select', icon: LiaMousePointerSolid },
  { name: 'hand', icon: RxHand },
  { name: 'rectangle', icon: PiRectangle },
  { name: 'circle', icon: GoCircle },
  { name: 'arrow', icon: GoArrowRight },
  { name: 'pen', icon: BsPencil },
  { name: 'eraser', icon: LuEraser },
  { name: 'text', icon: RxLetterCaseCapitalize },
  { name: 'image', icon:  CiImageOn },
];

export default function Toolbar({ tool, setTool }) {
  return (
    <div className="absolute cursor-pointer text-sm top-4 left-1/2 transform -translate-x-1/2 bg-[#ffffff] shadow-lg rounded-xl px-4 py-2 flex items-center gap-3 z-10">
      {tools.map(({ name, icon: Icon }) => (
        <button
          key={name}
          onClick={() => setTool(name)}
          className={`p-2 rounded-md   ${tool === name ? 'bg-indigo-100 text-indigo-600 rounded-md ' : 'hover:bg-gray-100'}`}
        >
          <Icon className="text-lg" />
        </button>
      ))}
    </div>
  );
}