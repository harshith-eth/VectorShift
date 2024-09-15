// draggableNode.js
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { ChevronDown } from 'lucide-react';

export const DraggableNode = ({ type, label, color = 'bg-primary', icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      className="cursor-grab"
      draggable
    >
      <Card className="w-[200px] shadow-md border-2 hover:border-primary transition-colors duration-200">
        <CardHeader className={`p-3 ${color} text-primary-foreground rounded-t-xl`}>
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm font-medium flex items-center">
              {icon && <span className="mr-2">{icon}</span>}
              {label}
              <Badge variant="secondary" className="ml-2 text-xs">
                {type}
              </Badge>
            </CardTitle>
            <ChevronDown size={16} />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground">Drag to add</p>
        </CardContent>
      </Card>
    </div>
  );
};