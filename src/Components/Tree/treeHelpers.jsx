const generatedArray = [];

const generateUniqueId = () => {
  const random = Math.ceil(Math.random() * (99999 - 10000) + 10000)

  if (!generatedArray.includes(random)) {
    generatedArray.push(random)
    return random
  } else {
    return generateUniqueId()
  }
}

const addUniqueIds = (tree) => {
  if (!tree) return []

  return tree.map((node) => {
    const newNode = {
      ...node,
      uniqueId: generateUniqueId(),
    }

    if (node.contains) {
      newNode.contains = addUniqueIds(node.contains)
    }

    return newNode
  })
}



const removeDraggedNodeFromTree = (tree, currentTargetTree, targetUniqueId) => {
    let removedNode = currentTargetTree.find(node => node.uniqueId === targetUniqueId);
    let filtredTree;

    const walkOnTree = (tree, targetUniqueId) => {
      const refreshedTree = tree.filter(node => node.uniqueId !== targetUniqueId);

      return refreshedTree.map(node => {
        const { contains, ...nodeWithoutContains } = node
  
        const returnObj = { ...nodeWithoutContains, contains: [] }

        if (contains) {
          returnObj.contains = walkOnTree(contains, targetUniqueId)
        }
  
        return returnObj
      })
    }
  
    filtredTree = walkOnTree(tree, targetUniqueId)
  
    return [ removedNode, filtredTree ]
}

const insertNodeInNewTree = (tree, nodeToInsert, insertTargetId) => {
    const walkOnTree = (tree, nodeToInsert, insertTargetId) => {
      return tree.map(node => {
        const { contains, ...nodeWithoutContains } = node
  
        const newNodeState = { ...nodeWithoutContains, contains: [] }
  
        if (node.uniqueId === insertTargetId) {
          newNodeState.contains = [
            ...contains,
            nodeToInsert,
          ]
        } else if (contains && contains.length) {
          newNodeState.contains = walkOnTree(contains, nodeToInsert, insertTargetId)
        }
  
        return newNodeState
      })
    }
  
    return walkOnTree(tree, nodeToInsert, insertTargetId)
  }


const moveNode = (tree, currentTargetTree, draggingItemId, dragOverItemId) => {
    const [
        removedNode,
        filtredTree
      ] = removeDraggedNodeFromTree(tree, currentTargetTree, draggingItemId)
    
      return insertNodeInNewTree(
        filtredTree,
        removedNode,
        dragOverItemId
      )
}


const refreshContainsTree = (tree, parentNodeStatus) => {
  return tree.map(node => {
      node.checked = parentNodeStatus
      if (node?.contains?.length) {
          node.contains = refreshContainsTree(node.contains, parentNodeStatus);
      }
      node.checkedContains = false;
      return node
  })
}

const searchTargetNode = (tree, e) => {
  return tree.map(node => {
      if (+e.target.id === node.uniqueId) {
          node.checked = !node.checked
          if (node?.contains?.length) {
              node.contains = refreshContainsTree(node.contains, node.checked);
          }
          node.checkedContains = false;
      } else {
          if (node?.contains?.length) {
              node.contains = searchTargetNode(node.contains, e)
          }
          node.checkedContains = node?.contains?.some(node => node.checked === true) || node?.contains?.some(node => node.checkedContains === true);
      }
      if (node?.contains?.length && node?.contains?.every(node => node.checked === true)) {
          node.checked = true
      }
      return node
  })
}

export { searchTargetNode, moveNode, addUniqueIds }