import React, { useState, useEffect, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { ChevronDown, Variable } from 'lucide-react';
import { Badge } from "../components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '');
  const [variables, setVariables] = useState([]);
  const [nodeWidth, setNodeWidth] = useState(250);
  const [nodeHeight, setNodeHeight] = useState(150);

  const extractVariables = useCallback((inputText) => {
    const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
    let matches = [...inputText.matchAll(regex)];
    return [...new Set(matches.map(match => match[1].trim()))];
  }, []);

  useEffect(() => {
    const newVariables = extractVariables(text);
    setVariables(newVariables);

    const lines = text.split('\n').length;
    const maxLineLength = Math.max(...text.split('\n').map(line => line.length));
    const calculatedWidth = Math.max(300, maxLineLength * 8);
    const calculatedHeight = Math.max(200, lines * 20 + 150);

    setNodeWidth(calculatedWidth);
    setNodeHeight(calculatedHeight);
  }, [text, extractVariables]);

  return (
    <TooltipProvider>
      <Card className="shadow-lg border-2 hover:border-primary transition-all duration-300 ease-in-out" 
            style={{ width: `${nodeWidth}px`, height: `${nodeHeight}px` }}>
        <CardHeader className="p-3 bg-gradient-to-r from-teal-500 to-teal-600 text-primary-foreground rounded-t-lg">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm font-medium flex items-center">
              <Variable className="mr-2" size={16} />
              Text Node
            </CardTitle>
            <ChevronDown size={16} />
          </div>
        </CardHeader>
        <CardContent className="p-4 bg-white">
          <div className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="text" className="text-xs font-medium">Text Content</Label>
              <Textarea 
                id="text"
                value={text} 
                onChange={(e) => setText(e.target.value)}
                className="min-h-[60px] resize-none"
                style={{ width: '100%', height: `${nodeHeight - 180}px` }}
                placeholder="Enter your text here. Use {{variableName}} to define variables."
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <AnimatePresence>
                {variables.map((variable) => (
                  <motion.div
                    key={variable}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant="secondary" className="cursor-help">
                          {variable}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Variable: {variable}</p>
                      </TooltipContent>
                    </Tooltip>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </CardContent>
        <Handle
          type="source"
          position={Position.Right}
          id={`${id}-output`}
          style={{ right: -8, top: '50%' }}
          className="w-3 h-3 border-2 bg-background"
        />
        {variables.map((variable, index) => (
          <Tooltip key={variable}>
            <TooltipTrigger>
              <Handle
                type="target"
                position={Position.Left}
                id={`${id}-${variable}`}
                style={{ left: -8, top: `${(index + 2) * 24}px` }}
                className="w-3 h-3 border-2 bg-background hover:border-primary transition-colors duration-200"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Input: {variable}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </Card>
    </TooltipProvider>
  );
};