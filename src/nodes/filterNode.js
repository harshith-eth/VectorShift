import React, { useState } from 'react';
import AbstractNode from './AbstractNode';
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'x > 0');

  const content = (
    <div className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor="condition" className="text-xs font-medium">Condition</Label>
        <Input 
          id="condition"
          value={condition} 
          onChange={(e) => setCondition(e.target.value)} 
        />
      </div>
    </div>
  );

  return (
    <AbstractNode
      id={id}
      data={data}
      type="Filter"
      inputs={['input']}
      outputs={['output']}
      content={content}
      color="bg-yellow-500"
    />
  );
};