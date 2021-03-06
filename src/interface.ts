export type Key = string | number

export interface RawNode {
  key: Key
  children?: RawNode[]
  isLeaf?: boolean
  disabled?: boolean
  [key: string]: any
}

export interface TreeNode {
  key: Key
  rawNode: RawNode
  level: number
  index: number
  isFirstChild: boolean
  isLastChild: boolean
  parent: TreeNode | null
  isLeaf: boolean
  disabled: boolean
  children?: TreeNode[]
}

export type TreeNodeMap = Map<Key, TreeNode>

export type LevelTreeNodeMap = Map<number, TreeNode[]>

export interface MergedKeys {
  checkedKeys: Key[]
  indeterminateKeys: Key[]
}

export interface TreeMateOptions {
  async?: boolean
}

type CheckActionTypeWithKey = 'check' | 'uncheck'
type CheckActionTypeNone = 'none'
export type CheckActionType = CheckActionTypeWithKey | CheckActionTypeNone
export type CheckAction = {
  type: CheckActionTypeWithKey
  data: Key | Key[]
} | {
  type: CheckActionTypeNone
}

export interface TreeMateInstance {
  treeNodes: TreeNode[]
  treeNodeMap: TreeNodeMap
  levelTreeNodeMap: LevelTreeNodeMap
  getCheckedKeys: (checkedKeys: Key[]) => MergedKeys
  check: (checkedKey: Key, checkedKeys: Key[]) => MergedKeys
  uncheck: (uncheckedKey: Key, checkedKeys: Key[]) => MergedKeys
}
