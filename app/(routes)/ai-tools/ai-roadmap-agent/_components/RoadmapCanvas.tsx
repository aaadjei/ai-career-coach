import React from 'react'; 
import {
    Background,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TurboNode from './TurboNode';

const nodeTypes = {
  turbo: TurboNode
};

const RoadmapCanvas = ({ initialNodes, initialEdges }: any) => {
  const [nodes, setNodes, onNodesChange]= useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={initialNodes} 
        edges={initialEdges} 
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      >
        <Controls />
        <MiniMap />
        {/*@ts-ignore */}
        <Background variant='dots' gap={12} size={1}/>
      </ReactFlow>
    </div>
  );
};

export default RoadmapCanvas;
