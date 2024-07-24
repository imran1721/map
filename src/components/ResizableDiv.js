import React, { useState, useRef } from 'react';

export const ResizableDiv = ({ children }) => {
  const [height, setHeight] = useState(420);
  const resizableRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    const startY = e.clientY;
    const startHeight = resizableRef.current.getBoundingClientRect().height;

    const doDrag = (e) => {
      const newHeight = startHeight + e.clientY - startY;
      setHeight(newHeight);
    };

    const stopDrag = () => {
      document.documentElement.removeEventListener('mousemove', doDrag, false);
      document.documentElement.removeEventListener('mouseup', stopDrag, false);
    };

    document.documentElement.addEventListener('mousemove', doDrag, false);
    document.documentElement.addEventListener('mouseup', stopDrag, false);
  };

  return (
    <div
      className='rounded-md w-64 border bg-black/90 m-2 fixed top-0'
      id="resizable"
      ref={resizableRef}
      style={{ height: `${height}px` }}
    >
      {children}
      <div
        id="resize-handle"
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};
