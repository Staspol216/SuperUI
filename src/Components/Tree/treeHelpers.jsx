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

export const addUniqueIds = (tree) => {
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



const findNodeByUniqueIdAndRemoveFromTree = (tree, currentTargetTree, targetUniqueId) => {
    let removedNode = currentTargetTree.find(node => node.uniqueId === targetUniqueId);
    let treeWithoutRemovedNode = tree.filter;

    const walkOnTree = (tree, targetUniqueId) => {
      const filteredTree = tree.filter(node => node.uniqueId !== targetUniqueId);

      return filteredTree.map((node) => {
        const { contains, ...nodeWithoutContains } = node
  
        const returnObj = { ...nodeWithoutContains, contains: [] }
  
        if (contains) {
          returnObj.contains = walkOnTree(contains, targetUniqueId)
        }
  
        return returnObj
      })
    }
  
    treeWithoutRemovedNode = walkOnTree(tree, targetUniqueId)
  
    return [ removedNode, treeWithoutRemovedNode ]
}

const insertGivenNodeIntoNodeWithGivenUniqueId = (tree, nodeToInsert, whereToInsertUniqueId) => {
    const walkOnTree = (tree, nodeToInsert, whereToInsertUniqueId) => {
      return tree.map((node) => {
        const { contains, ...nodeWithoutContains } = node
  
        const newNodeState = { ...nodeWithoutContains, contains: [] }
  
        if (node.uniqueId === whereToInsertUniqueId) {
          newNodeState.contains = [
            ...contains,
            nodeToInsert,
          ]
        } else if (contains && contains.length) {
          newNodeState.contains = walkOnTree(contains, nodeToInsert, whereToInsertUniqueId)
        }
  
        return newNodeState
      })
    }
  
    return walkOnTree(tree, nodeToInsert, whereToInsertUniqueId)
  }


export const moveNode = (tree, currentTargetTree, draggingItem, absorberItem) => {
    const [
        nodeWithGivenUniqueId,
        treeWithoutNodeWithGivenUniqueId
      ] = findNodeByUniqueIdAndRemoveFromTree(tree, currentTargetTree, draggingItem)
    
      return insertGivenNodeIntoNodeWithGivenUniqueId(
        treeWithoutNodeWithGivenUniqueId,
        nodeWithGivenUniqueId,
        absorberItem
      )
}