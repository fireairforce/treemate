import { 
  Key,
  TreeNode,
  TreeNodeMap,
  LevelTreeNodeMap
} from './interface'

function traverse (
  treeNode: TreeNode,
  callback: (treeNode: TreeNode) => any,
) {
  callback(treeNode)
  if (treeNode.children !== undefined && !treeNode.disabled) {
    treeNode.children.forEach(childNode => traverse(childNode, callback))
  }
}

function getExtendedCheckedKeysAfterCheck (
  checkKey: Key,
  currentCheckedKeys: Key[],
  TreeNodeMap: TreeNodeMap
): Key[] {
  return getExtendedCheckedKeys(
    currentCheckedKeys.concat([checkKey]),
    TreeNodeMap
  )
}

function getExtendedCheckedKeysAfterUncheck (
  uncheckKey: Key,
  currentCheckedKeys: Key[],
  TreeNodeMap: TreeNodeMap
): Key[] {
  const extendedCheckedKeys = getExtendedCheckedKeys(
    currentCheckedKeys,
    TreeNodeMap
  )
  const extendedKeySetToUncheck = new Set(getExtendedCheckedKeys(
    [ uncheckKey ],
    TreeNodeMap
  ))
  return extendedCheckedKeys.filter(
    checkedKey => !extendedKeySetToUncheck.has(checkedKey)
  )
}

function getCheckedKeys (
  checkedKeys: Key[],
  treeNodes: TreeNode[],
  levelTreeNodeMap: LevelTreeNodeMap
) {
  const syntheticCheckedKeys = []
  const checkedKeySet = new Set(checkedKeys)
  const maxLevel = Math.max.apply(
    null,
    Array.from(levelTreeNodeMap.keys())
  )
  for (let level = maxLevel; level >= 0; level -= 1) {
    const levelTreeNodes = levelTreeNodeMap.get(level)!
    for (const levelTreeNode of levelTreeNodes) {
      if (levelTreeNode.isLeaf) {
        if (checkedKeySet.has(levelTreeNode.key)) {
          syntheticCheckedKeys.push(levelTreeNode.key)
        }
      } else {

      }
    }
  }
}

function getExtendedCheckedKeys (
  checkedKeys: Key[],
  TreeNodeMap: TreeNodeMap
): Key[] {
  const visitedKeySet: Set<Key> = new Set()
  const extendedCheckedKey: Key[] = []
  checkedKeys.forEach(checkedKey => {
    const checkedTreeNode = TreeNodeMap.get(checkedKey)
    if (checkedTreeNode !== undefined) {
      traverse(checkedTreeNode, treeNode => {
        if (visitedKeySet.has(treeNode.key)) return
        visitedKeySet.add(treeNode.key)
        extendedCheckedKey.push(treeNode.key)
      })
    }
  })
  return Array.from(new Set(extendedCheckedKey))
}