import React from 'react';
import AbstractNode from './AbstractNode';

export const LLMNode = ({ id, data }) => {
  const content = (
    <div className="text-sm">
      This is a LLM node.
    </div>
  );

  return (
    <AbstractNode
      id={id}
      data={data}
      type="LLM"
      inputs={['system', 'prompt']}
      outputs={['response']}
      content={content}
      color="bg-pink-500"
    />
  );
};