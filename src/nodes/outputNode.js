import React, { useState } from 'react';
import AbstractNode from './AbstractNode';
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Label } from "../components/ui/label";

export const OutputNode = ({ id, data }) => {
  const [outputName, setOutputName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const content = (
    <div className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor="outputName" className="text-xs font-medium">Name</Label>
        <Input 
          id="outputName"
          value={outputName} 
          onChange={(e) => setOutputName(e.target.value)} 
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="outputType" className="text-xs font-medium">Type</Label>
        <Select value={outputType} onValueChange={setOutputType}>
          <SelectTrigger id="outputType">
            <SelectValue>{outputType}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Text">Text</SelectItem>
            <SelectItem value="Image">Image</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <AbstractNode
      id={id}
      data={data}
      type="Output"
      inputs={['value']}
      content={content}
      color="bg-red-500"
    />
  );
};