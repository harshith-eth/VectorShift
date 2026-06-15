import React, { useState } from 'react';
import AbstractNode from './AbstractNode';
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";

export const DatabaseNode = ({ id, data }) => {
  const [query, setQuery] = useState(data?.query || 'SELECT * FROM table');

  const content = (
    <div className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor="query" className="text-xs font-medium">Query</Label>
        <Textarea 
          id="query"
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          rows={3}
        />
      </div>
    </div>
  );

  return (
    <AbstractNode
      id={id}
      data={data}
      type="Database"
      inputs={['params']}
      outputs={['result']}
      content={content}
      color="bg-green-500"
    />
  );
};