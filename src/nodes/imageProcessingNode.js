import React, { useState } from 'react';
import AbstractNode from './AbstractNode';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Label } from "../components/ui/label";

export const ImageProcessingNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'resize');

  const content = (
    <div className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor="operation" className="text-xs font-medium">Operation</Label>
        <Select value={operation} onValueChange={setOperation}>
          <SelectTrigger id="operation">
            <SelectValue>{operation}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="resize">Resize</SelectItem>
            <SelectItem value="crop">Crop</SelectItem>
            <SelectItem value="rotate">Rotate</SelectItem>
            <SelectItem value="filter">Apply Filter</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <AbstractNode
      id={id}
      data={data}
      type="Image Processing"
      inputs={['image']}
      outputs={['processedImage']}
      content={content}
      color="bg-purple-500"
    />
  );
};