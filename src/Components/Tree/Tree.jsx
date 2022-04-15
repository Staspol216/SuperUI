
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


    const handleCheckboxChange = (e) => {
        const refreshTree = (tree, e) => {
            return tree.map(node => {
                if (+e.target.id === node.uniqueId) {
                    node.checked = !node.checked
                }
                
                const { contains, ...otherProps} = node;
                const refreshedNode = {...otherProps, contains: []};

                if (contains && contains?.length) {
                    refreshedNode.contains = refreshTree(contains, e);
                }

                if (node?.contains?.length && node.checked) {
                    node.contains.map(node => node.checked = true)
                }

                if (node?.contains?.length && node.checked === false) {
                    node.contains.map(node => node.checked = false)
                }
                
                return refreshedNode
            })
        }
        const refreshedTree = refreshTree(tree, e);
        setTree(refreshedTree);
    }
    
    const buildTree = (tree) => {
        
        const mappedNodes = tree.map(node => {
            const isExpanded = expandedNodes.includes(node.uniqueId);
            let {contains, name, checked, uniqueId } = node;

            // let hasCheckedContains;
            // let hasAllCheckedContains;

            // if (contains?.some(node => node.checked === true)) {
            //     hasCheckedContains = true;
            // } else {
            //     hasCheckedContains = false;
            // }

            // if (contains?.every(node => node.checked === true)) {
            //     hasAllCheckedContains = true;
            // } else {
            //     hasAllCheckedContains = false;
            // }

            const checkBoxClass = cn("tree-checkbox-wrapper", {
                "tree-checkbox-checked-contains": false
            })
            const switcherClass = cn("tree-switcher", {
                "open": isExpanded && node.contains,
                "empty": !node.contains?.length,
            })

            return (
                <div 
                key={uniqueId}
                style={ isExpanded ? { height: 'auto'} : { height:'28px' }}
                className="tree-node"
                >
                    <div
                    data-unique-id={uniqueId}
                    draggable
                    onDragStart={handleDragStart}
                    onDragEnter={handleDragEnter}
                    onDragEnd={() => { handleDragEnd(tree) }}
                    className="tree-node-row">
                        <div
                        data-unique-id={uniqueId}
                        onClick={handleNodeExpand}
                        className={switcherClass}>
                            <span className="tree-icon">
                                <Switcher />
                            </span>
                        </div>
                        <span className={checkBoxClass}>
                            <input id={uniqueId} name={name} checked={checked} onChange={(e) => handleCheckboxChange(e)} type="checkbox" className="tree-checkbox" />
                        </span>
                        <div className="tree-content">{name}</div>
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