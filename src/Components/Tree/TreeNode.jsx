import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const TreeNode = ({ id, onDrop, moveItem, children }) => {

    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: 'task',
            item: { id },
            end: (item, monitor) => {
                const dropResult = monitor.getDropResult();
                const didDrop = monitor.didDrop();
                const { id } = item;
                const { uniqueId } = dropResult;
                if (didDrop && uniqueId !== id) {
                    moveItem(id, uniqueId)
                }
            }
        }),
        [id]
    )

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: 'task',
        drop: onDrop,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
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