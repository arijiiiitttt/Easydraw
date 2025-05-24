export default function StatusBar({ tool, zoom }) {
  const toolNames = {
    pencil: 'Pencil',
    rectangle: 'Rectangle',
    ellipse: 'Ellipse',
    line: 'Line'
  };

  return (
    <footer className="bg-white border-t border-gray-200 px-4 py-2 text-sm text-gray-600">
      <div className="flex justify-between">
        <span>Tool: {toolNames[tool]}</span>
        <span>Zoom: {Math.round(zoom * 100)}%</span>
      </div>
    </footer>
  );
}