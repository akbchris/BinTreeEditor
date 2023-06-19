export class BinTreeNode {
  id: string | number
  left?: BinTreeNode | null
  right?: BinTreeNode | null
  constructor(
    id: string | number,
    left?: BinTreeNode | null,
    right?: BinTreeNode | null,
  ) {
    this.id = id
    this.left = left
    this.right = right
  }
}
export type TInputValue = string | number
export type TInputArr =
  | [TInputValue, TInputArr | null, TInputArr | null]
  | [TInputValue]

export function parseArrayToTree(arr: TInputArr): BinTreeNode {
  if (!arr.length) {
    throw new Error("Parsing Error, Please select correct input")
  }
  if (arr.length === 1) {
    // Early return if it doesn't exist
    return new BinTreeNode(arr[0])
  }
  const [id, leftArr, rightArr] = arr

  let leftNode = null
  let rightNode = null
  // recursive parse children nodes if it still contains
  if (Array.isArray(leftArr)) {
    leftNode = parseArrayToTree(leftArr as TInputArr)
  }

  if (Array.isArray(rightArr)) {
    rightNode = parseArrayToTree(rightArr as TInputArr)
  }
  return new BinTreeNode(id, leftNode, rightNode)
}
