export default function SidePanel({
  tool,
  color,
  strokeWidth,
  zoom,
  onToolChange,
  onColorChange,
  onStrokeWidthChange,
  onZoom
}) {
  const colors = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', 
    '#8b5cf6', '#ec4899', '#000000', '#ffffff'
  ];

  const widths = [1, 2, 3, 5, 8];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
      <div className="space-y-6">
        <section>
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Tools</h2>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'pencil', icon: '✏️', label: 'Pencil' },
              { id: 'rectangle', icon: '⬛', label: 'Rectangle' },
              { id: 'ellipse', icon: '⚪', label: 'Ellipse' },
              { id: 'line', icon: '➖', label: 'Line' }
            ].map(({ id, icon, label }) => (
              <button
                key={id}
                onClick={() => onToolChange(id)}
                className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                  tool === id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                }`}
              >
                <span className="text-xl mb-1">{icon}</span>
                <span className="text-xs">{label}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Colors</h2>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {colors.map(c => (
              <button
                key={c}
                onClick={() => onColorChange(c)}
                className={`w-8 h-8 rounded-full border-2 transition-transform ${
                  color === c ? 'border-blue-500 scale-110' : 'border-gray-200 hover:scale-105'
                }`}
                style={{ backgroundColor: c }}
                aria-label={`Color ${c}`}
              />
            ))}
          </div>
          <input
            type="color"
            value={color}
            onChange={(e) => onColorChange(e.target.value)}
            className="w-full h-10 cursor-pointer rounded border border-gray-300"
          />
        </section>

        <section>
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Stroke Width</h2>
          <div className="flex gap-2">
            {widths.map(width => (
              <button
                key={width}
                onClick={() => onStrokeWidthChange(width)}
                className={`flex-1 py-2 rounded-md transition-colors ${
                  strokeWidth === width ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <div 
                  className="mx-auto bg-current rounded-full" 
                  style={{ width: width * 3, height: width }}
                />
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Zoom</h2>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onZoom(-0.1)}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md"
              disabled={zoom <= 0.1}
            >
              -
            </button>
            <span className="flex-1 text-center text-sm font-medium">
              {Math.round(zoom * 100)}%
            </span>
            <button 
              onClick={() => onZoom(0.1)}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md"
              disabled={zoom >= 5}
            >
              +
            </button>
          </div>
        </section>
      </div>
    </aside>
  );
}