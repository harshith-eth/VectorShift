// minimap.js
import React, { useRef } from 'react';

const MiniMap = ({ nodes }) => {
  const mapRef = useRef(null);
  const scale = 0.1; // Adjust this value to change the minimap scale

  return (
    <div
      ref={mapRef}
      style={{
        position: 'absolute',
        bottom: '12px',
        left: '55px', // Positioned to the right of the zoom controls
        width: '150px', // Increased size
        height: '150px', // Increased size
        border: '1px solid hsl(var(--border))',
        backgroundColor: 'hsl(var(--background))',
        overflow: 'hidden',
        borderRadius: '8px', // Curved edges
      }}
    >
      {nodes.map((node) => (
        <div
          key={node.id}
          style={{
            position: 'absolute',
            left: `${node.position.x * scale}px`,
            top: `${node.position.y * scale}px`,
            width: `${node.width * scale}px`,
            height: `${node.height * scale}px`,
            backgroundColor: 'hsl(var(--muted))',
            borderRadius: '4px', // Curved edges for node representations
          }}
        />
      ))}
    </div>
  );
};

export default MiniMap;