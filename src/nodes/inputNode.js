import React, { useState } from 'react';
import AbstractNode from './AbstractNode';
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Label } from "../components/ui/label";

export const InputNode = ({ id, data }) => {
  const [inputName, setInputName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const content = (
    <div className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor="inputName" className="text-xs font-medium">Name</Label>
        <Input 
          id="inputName"
          value={inputName} 
          onChange={(e) => setInputName(e.target.value)} 
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="inputType" className="text-xs font-medium">Type</Label>
        <Select value={inputType} onValueChange={setInputType}>
          <SelectTrigger id="inputType">
            <SelectValue>{inputType}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Text">Text</SelectItem>
            <SelectItem value="File">File</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <AbstractNode
      id={id}
      data={data}
      type="Input"
      outputs={['value']}
      content={content}
      color="bg-indigo-500"
    />
  );
};