
import './Tree.scss';
import { ReactComponent as Switcher } from "../../icons/switcher.svg";
import { treeData } from './treeDB';
import { useEffect, useState } from 'react';
import cn from 'classnames';

import { addUniqueIds, moveNode, searchTargetNode } from './treeHelpers';
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

    const moveItem = (currentTargetTree, draggingId, dragOverId) => {
        let newTree;
        newTree = moveNode(tree, currentTargetTree, draggingId, dragOverId);
        setTree(newTree);
    };

    const handleCheckboxChange = (e) => {
        const refreshedTree = searchTargetNode(tree, e);
        setTree(refreshedTree);
    }

    const removeFromExpandedNodes = (e) => {
        const filteredExpandedNodes = expandedNodes.filter(nodeUniqueId => nodeUniqueId !== e.id)
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
                        data-unique-id={uniqueId}
                        id={uniqueId}
                        draggable
                        onDrop={() => ({ uniqueId })}
                        moveItem={(draggingId, dragOverId) => moveItem(tree, draggingId, dragOverId)}
                        removeFromExpandedNodes={removeFromExpandedNodes}
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
                            <input id={uniqueId} name={name} checked={checked} onChange={(e) => handleCheckboxChange(e)} type="checkbox" className="tree-checkbox" />
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