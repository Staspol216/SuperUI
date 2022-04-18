import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const TreeNode = ({id, onDrop, children}) => {

    const [{isDragging}, drag] = useDrag(
        () => ({
            type: 'task',
            item: { id },
            end: (item, monitor) => {
                console.log(item, monitor)
            }
        }),
        [id]
    )

    const [{isOver, canDrop}, drop] = useDrop({
        accept: 'task',
        drop: onDrop,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        })
    })

    return (
        <div
        ref={node => drag(drop(node))}
        className="tree-node-row"
        >
            {children}
        </div>
    );
};

export default TreeNode;