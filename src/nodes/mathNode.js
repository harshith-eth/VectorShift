import React, { useState } from 'react';
import AbstractNode from './AbstractNode';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Label } from "../components/ui/label";

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');

  const content = (
    <div className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor="operation" className="text-xs font-medium">Operation</Label>
        <Select value={operation} onValueChange={setOperation}>
          <SelectTrigger id="operation">
            <SelectValue>{operation}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="add">Add</SelectItem>
            <SelectItem value="subtract">Subtract</SelectItem>
            <SelectItem value="multiply">Multiply</SelectItem>
            <SelectItem value="divide">Divide</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <AbstractNode
      id={id}
      data={data}
      type="Math"
      inputs={['input1', 'input2']}
      outputs={['result']}
      content={content}
      color="bg-orange-500"
    />
  );
};