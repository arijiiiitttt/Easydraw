export const exportToPNG = (canvasRef) => {
  try {
    const svgElement = canvasRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      
      const png = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = png;
      link.download = `drawing-${new Date().toISOString().slice(0, 10)}.png`;
      link.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  } catch (error) {
    console.error('Error exporting to PNG:', error);
    alert('Failed to export as PNG');
  }
};

export const exportToJSON = (elements) => {
  try {
    const data = JSON.stringify(elements, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `drawing-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting to JSON:', error);
    alert('Failed to export as JSON');
  }
};

export const importFromJSON = async () => {
  try {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return resolve(null);
        
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target.result);
            resolve(data);
          } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            alert('Invalid file format');
            resolve(null);
          }
        };
        reader.readAsText(file);
      };
      
      input.click();
    });
  } catch (error) {
    console.error('Error importing from JSON:', error);
    alert('Failed to import file');
    return null;
  }
};