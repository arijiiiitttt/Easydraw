"use client"
import { useState, useCallback } from 'react';

export const useDrawingHistory = (initialElements) => {
  const [history, setHistory] = useState([initialElements]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const recordHistory = useCallback((newElements) => {
    setHistory(prev => [...prev.slice(0, historyIndex + 1), newElements]);
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
    }
  }, [historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
    }
  }, [historyIndex, history.length]);

  return {
    history,
    historyIndex,
    elements: history[historyIndex] || [],
    recordHistory,
    undo,
    redo,
  };
};

export const HistoryControls = ({ undo, redo }) => {
  return (
    <div className="absolute top-4 left-20 bg-white p-2 rounded-lg shadow-md flex gap-2 z-10">
      <button
        onClick={undo}
        className="p-2 bg-gray-200 rounded hover:bg-gray-300"
        title="Undo (Ctrl+Z)"
      >
        ⎌ Undo
      </button>
      <button
        onClick={redo}
        className="p-2 bg-gray-200 rounded hover:bg-gray-300"
        title="Redo (Ctrl+Shift+Z)"
      >
        Redo ⎌
      </button>
    </div>
  );
};