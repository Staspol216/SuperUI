
import './Tree.scss';
import { ReactComponent as Switcher } from "../../icons/switcher.svg";
import { ReactComponent as Holder } from "../../icons/holder.svg";
import { treeData } from './treeDB';
import { useEffect, useState } from 'react';
import cn from 'classnames';

import { addUniqueIds, moveNode } from './treeHelpers';


const Tree = () => {
    const [tree, setTree] = useState([]);
    const [expandedNodes, setExpandedNodes] = useState([]);
    const [currentDraggingId, setCurrentDraggingId] = useState();
    const [currentDragOverId, setCurrentDragOverId] = useState();

    const handleNodeExpand = (e) => {
        !expandedNodes.includes(+e.currentTarget.dataset.uniqueId)
            ? setExpandedNodes([...expandedNodes, +e.currentTarget.dataset.uniqueId])
            : setExpandedNodes(expandedNodes.filter((x) => x !== +e.currentTarget.dataset.uniqueId));
    }

    useEffect(() => {
        setTree(addUniqueIds(treeData))
    }, [])
    

    const handleDragStart = (e) => {
        setCurrentDraggingId(+e.currentTarget.dataset.uniqueId);
        setCurrentDragOverId(+e.currentTarget.dataset.uniqueId);
    };

    const handleDragEnter = (e) => {
        if (currentDraggingId !== +e.currentTarget.dataset.uniqueId) {
            setCurrentDragOverId(+e.currentTarget.dataset.uniqueId);
        } else {
            setCurrentDraggingId(currentDraggingId);
        }
    };

    const handleDragEnd = (currentTargetTree) => {
        if (currentDraggingId !== currentDragOverId) {
            let newTree;
            newTree = moveNode(tree, currentTargetTree, currentDraggingId, currentDragOverId);
            setTree(newTree);
        }

        setCurrentDraggingId(undefined);
        setCurrentDragOverId(undefined);
    };

    const handleChecked = (e) => {
        console.log(e);
    }
    
    
    const buildTree = (tree) => {
        const mappedNodes = tree.map(node => {
        const isExpanded = expandedNodes.includes(node.uniqueId);

        const switcherClass = cn("tree-switcher", {
            "open": isExpanded && node.contains,
            "empty": !node.contains?.length,
        })

        return (
            <div 
            key={node.uniqueId}
            style={ isExpanded ? { height: 'auto'} : { height:'28px' }}
            className="tree-node"
            >
                <div
                data-unique-id={node.uniqueId}
                draggable
                onDragStart={handleDragStart}
                onDragEnter={handleDragEnter}
                onDragEnd={() => { handleDragEnd(tree) }}
                className="tree-node-row">
                    <div
                    data-unique-id={node.uniqueId}
                    onClick={handleNodeExpand}
                    className={switcherClass}>
                        <span className="tree-icon">
                            <Switcher />
                        </span>
                    </div>
                    <span className="tree-checkbox">
                        <input onChange={(e) => handleChecked(e)} type={"checkbox"} className="tree-checkbox-inner" />
                    </span>
                    <div className="tree-content">{node.name}</div>
                </div>
                {node.contains ? buildTree(node.contains) : null}
            </div>  
        )
        })

        return mappedNodes;
    }


    return (
        <div className="tree-wrapper">
            <div className="tree-list">
                   {tree.length ? buildTree(tree) : null}
            </div>
        </div>
    )
};


export { Tree }; 