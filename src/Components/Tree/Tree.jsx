
import './Tree.scss';
import { ReactComponent as Switcher } from "../../icons/switcher.svg";
import { treeData } from './treeDB';
import { useEffect, useState } from 'react';
import cn from 'classnames';

import { addUniqueIds, createNewTree, refreshCheckBoxState } from './treeHelpers';
import TreeNode from './TreeNode';


const Tree = () => {
    const [tree, setTree] = useState([]);
    const [expandedNodes, setExpandedNodes] = useState([]);

    const handleNodeExpand = (e) => {
        !expandedNodes.includes(+e.currentTarget.dataset.uniqueId)
            ? setExpandedNodes([...expandedNodes, +e.currentTarget.dataset.uniqueId])
            : setExpandedNodes(expandedNodes.filter((x) => x !== +e.currentTarget.dataset.uniqueId));
    }

    useEffect(() => {
       setTree(addUniqueIds(treeData))
    }, [])
    
    
    const moveNode = (currentTargetTree, draggingId, dragOverId) => {
        const newTree = createNewTree(tree, currentTargetTree, draggingId, dragOverId);
        console.log(newTree);
        setTree(newTree);
    };

    const handleCheckboxChange = (id) => {
        const refreshedTree = refreshCheckBoxState(tree, id);
        setTree(refreshedTree);
    }

    const collapseNode = (id) => {
        const filteredExpandedNodes = expandedNodes.filter(nodeUniqueId => nodeUniqueId !== id)
        setExpandedNodes(filteredExpandedNodes);
    }

    const buildTree = (tree) => {
        const mappedNodes = tree.map(node => {
            let isExpanded = expandedNodes.includes(node.uniqueId);
            let { name, checked, uniqueId, checkedContains } = node;
            const checkBoxClass = cn("tree-checkbox-wrapper", {
                "tree-checkbox-checked-contains": checkedContains && !checked
            })
            const switcherClass = cn("tree-switcher", {
                "open": isExpanded && node.contains,
                "empty": !node?.contains?.length,
            })
            return (
                <div
                    key={uniqueId}
                    style={isExpanded ? { height: 'auto' } : { height: '28px' }}
                    className="tree-node"
                >
                    <TreeNode
                        id={uniqueId}
                        onDrop={() => ({ uniqueId })}
                        moveNode={(draggingId, dragOverId) => moveNode(tree, draggingId, dragOverId)}
                        collapseNode={() => collapseNode(uniqueId)}
                        >
                        <div
                            data-unique-id={uniqueId}
                            onClick={handleNodeExpand}
                            className={switcherClass}>
                            <span className="tree-icon">
                                <Switcher />
                            </span>
                        </div>
                        <span className={checkBoxClass}>
                            <input id={uniqueId} name={name} checked={checked} onChange={() => handleCheckboxChange(uniqueId)} type="checkbox" className="tree-checkbox" />
                        </span>
                        <div className="tree-content">{name}</div>
                    </TreeNode>
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