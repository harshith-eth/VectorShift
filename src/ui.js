import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';
import MiniMap from './minimap';

// Import all node components
import { InputNode } from './nodes/inputNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { LLMNode } from './nodes/llmNode';
import { FilterNode } from './nodes/filterNode';
import { MathNode } from './nodes/mathNode';
import { ImageProcessingNode } from './nodes/imageProcessingNode';
import { APINode } from './nodes/apiNode';
import { DatabaseNode } from './nodes/databaseNode';

const nodeTypes = {
  input: InputNode,
  output: OutputNode,
  text: TextNode,
  llm: LLMNode,
  filter: FilterNode,
  math: MathNode,
  imageProcessing: ImageProcessingNode,
  api: APINode,
  database: DatabaseNode,
};

const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: `${type}-${nodes.length + 1}`,
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, nodes, setNodes]
  );

  return (
    <div style={{ width: '100%', height: 'calc(100vh - 190px)' }} ref={reactFlowWrapper}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          elementsSelectable={true}
          selectNodesOnDrag={false}
          nodesDraggable={true}
        >
          <Controls />
          <Background color="#aaa" gap={16} />
          <MiniMap nodes={nodes} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default PipelineUI;