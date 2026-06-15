import React, { useState } from 'react';
import AbstractNode from './AbstractNode';
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Label } from "../components/ui/label";

export const APINode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://api.example.com');
  const [method, setMethod] = useState(data?.method || 'GET');

  const content = (
    <div className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor="url" className="text-xs font-medium">URL</Label>
        <Input 
          id="url"
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="method" className="text-xs font-medium">Method</Label>
        <Select value={method} onValueChange={setMethod}>
          <SelectTrigger id="method">
            <SelectValue>{method}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GET">GET</SelectItem>
            <SelectItem value="POST">POST</SelectItem>
            <SelectItem value="PUT">PUT</SelectItem>
            <SelectItem value="DELETE">DELETE</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <AbstractNode
      id={id}
      data={data}
      type="API"
      inputs={['params']}
      outputs={['response']}
      content={content}
      color="bg-blue-500"
    />
  );
};