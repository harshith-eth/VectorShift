import React from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { ChevronDown } from 'lucide-react';

const AbstractNode = ({ 
  id, 
  data, 
  type,
  inputs = [], 
  outputs = [], 
  content,
  color = 'bg-primary'
}) => {
  return (
    <Card className="w-[250px] shadow-lg border-2 hover:border-primary transition-colors duration-200 dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className={`p-3 ${color} text-primary-foreground rounded-t-lg`}>
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium">{type}</CardTitle>
          <ChevronDown size={16} />
        </div>
      </CardHeader>
      <CardContent className="p-4 bg-white dark:bg-gray-700 dark:text-gray-100">
        {content}
      </CardContent>
      {inputs.map((input, index) => (
        <Handle
          key={`input-${index}`}
          type="target"
          position={Position.Left}
          id={`${id}-${input}`}
          style={{ left: -8, top: `${25 + (index * 50)}%` }}
          className="w-3 h-3 border-2 bg-background dark:bg-gray-300"
        />
      ))}
      {outputs.map((output, index) => (
        <Handle
          key={`output-${index}`}
          type="source"
          position={Position.Right}
          id={`${id}-${output}`}
          style={{ right: -8, top: `${25 + (index * 50)}%` }}
          className="w-3 h-3 border-2 bg-background dark:bg-gray-300"
        />
      ))}
    </Card>
  );
};

export default AbstractNode;