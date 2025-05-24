const ColorPicker = ({ color, setColor, strokeWidth, setStrokeWidth }) => {
  const colors = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
    '#ec4899', '#000000', '#ffffff', '#64748b', '#94a3b8'
  ];

  const widths = [1, 2, 3, 5, 8];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Colors</h3>
        <div className="grid grid-cols-5 gap-2">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                color === c ? 'border-blue-500 scale-110' : 'border-gray-200'
              }`}
              style={{ backgroundColor: c }}
              title={c}
            />
          ))}
        </div>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="mt-2 w-full h-10 cursor-pointer rounded border border-gray-300"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Stroke Width</h3>
        <div className="flex space-x-2">
          {widths.map((width) => (
            <button
              key={width}
              onClick={() => setStrokeWidth(width)}
              className={`flex items-center justify-center w-10 h-10 rounded-md transition-colors ${
                strokeWidth === width 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              <div 
                className="bg-current" 
                style={{ width: width * 3, height: width }}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="p-3 bg-gray-100 rounded-lg">
        <div className="text-xs text-gray-500">
          <p className="font-medium">Current Settings:</p>
          <p>Color: <span style={{ color }}>{color}</span></p>
          <p>Width: {strokeWidth}px</p>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;