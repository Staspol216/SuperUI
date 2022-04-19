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

// const loop = (tree, callback) => {
//   return tree.map(node => {
//     if ()
//   })
// }



const removeDraggedNodeFromTree = (tree, currentTargetTree, targetUniqueId) => {
    const removedNode = currentTargetTree.find(node => node.uniqueId === targetUniqueId);

    const walkOnTree = (tree, targetUniqueId) => {

      const refreshedTree = tree.filter(node => node.uniqueId !== targetUniqueId);

      return refreshedTree.map(node => {
          if (node.contains.length) {
            node.contains = walkOnTree(node.contains, targetUniqueId)
          }
          node.checkedContains = node?.contains?.some(node => node.checked === true) || node?.contains?.some(node => node.checkedContains === true);
        
        return node
      })
    }
  
    const filtredTree = walkOnTree(tree, targetUniqueId);
  
    return [ removedNode, filtredTree ]
}

const insertNodeInNewTree = (tree, nodeToInsert, insertTargetId) => {
    const walkOnTree = (tree, nodeToInsert, insertTargetId) => {
      return tree.map(node => {
        let { contains, uniqueId } = node;

        if (uniqueId === insertTargetId ) {
            contains.push(nodeToInsert)
        }
        if (uniqueId !== insertTargetId && contains.length) {
          contains = walkOnTree(contains, nodeToInsert, insertTargetId)
        }
        return node
      })
    }
  
    return walkOnTree(tree, nodeToInsert, insertTargetId)
  }


const createNewTree = (tree, currentTargetTree, draggingItemId, dragOverItemId) => {
    const [
        removedNode,
        filtredTree
      ] = removeDraggedNodeFromTree(tree, currentTargetTree, draggingItemId)

      const treeWithNewNode = insertNodeInNewTree(filtredTree, removedNode, dragOverItemId)
    
      return refreshCheckBoxState(treeWithNewNode, draggingItemId, true)
}


const refreshContainsTree = (tree, parentNodeStatus, checkboxRefreshByMoved) => {
  return tree.map(node => {
    if (!checkboxRefreshByMoved) {
      node.checked = parentNodeStatus
    }
    if (node?.contains?.length) {
      node.contains = refreshContainsTree(node.contains, parentNodeStatus);
    }
    node.checkedContains = false
    return node
  })
}

const refreshCheckBoxState = (tree, targetId, checkboxRefreshByMoved = false) => {
  return tree.map(node => {
      let { checked } = node;
      if (targetId === node.uniqueId) {
        if (!checkboxRefreshByMoved) {
          node.checked = !node.checked
        }
        if (node?.contains?.length) {
            node.contains = refreshContainsTree(node.contains, node.checked, checkboxRefreshByMoved);
        }
        node.checkedContains = false
      } else {
          if (node?.contains?.length) {
              node.contains = refreshCheckBoxState(node.contains, targetId, checkboxRefreshByMoved)
          }
          node.checkedContains = node?.contains?.some(node => node.checked === true) || node?.contains?.some(node => node.checkedContains === true);
      }

      if (node?.contains?.length && node?.contains?.every(node => node.checked === true)) {
          node.checked = true
      }
      return node
  })
}

export { refreshCheckBoxState, createNewTree, addUniqueIds }