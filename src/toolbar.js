import React from 'react';
import { Database, Filter, Image, Api, InputCursor, Output, MathFunction, Text, Robot } from 'lucide-react';

const tools = [
  { type: 'input', label: 'Input Node', icon: <InputCursor size={16} /> },
  { type: 'output', label: 'Output Node', icon: <Output size={16} /> },
  { type: 'text', label: 'Text Node', icon: <Text size={16} /> },
  { type: 'pipeline', label: 'Pipeline Node', icon: <Robot size={16} /> }, // Assuming Pipeline relates to automation/robots
  { type: 'transform', label: 'Transform Node', icon: <MathFunction size={16} /> }, // If Transform deals with data manipulation
  { type: 'filter', label: 'Filter Node', icon: <Filter size={16} /> },
  { type: 'database', label: 'Database Node', icon: <Database size={16} /> },
  { type: 'api', label: 'API Node', icon: <Api size={16} /> },
  { type: 'imageProcessing', label: 'Image Processing Node', icon: <Image size={16} /> },
];

export const PipelineToolbar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-3">Tools</h2>
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
        {tools.map((tool) => (
          <div
            key={tool.type}
            className="flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg p-3 cursor-grab"
            onDragStart={(event) => onDragStart(event, tool.type)}
            draggable
          >
            {tool.icon}
            <span className="text-xs">{tool.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
