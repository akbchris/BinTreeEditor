import { BinTreeNode } from "./parseArrayToTree"

/**
 * @param root
 * @returns {BinTreeNode} to return the nearest node containing all deepest nodes
 */
export const findSubtreeNodeWithAllDeepestLeaves = function (
  root: BinTreeNode | undefined | null,
): BinTreeNode | undefined {
  if (!root) return
  const depthL = getMaxDepth(root?.left)
  const depthR = getMaxDepth(root?.right)
  if (depthL > depthR) {
    return findSubtreeNodeWithAllDeepestLeaves(root.left)
  } else if (depthR > depthL) {
    return findSubtreeNodeWithAllDeepestLeaves(root.right)
  }
  return root
}

/**
 * Helper function to get the maxDepth of a TreeNode
 * @param root {BinTreeNode} - is the node we are finding
 * @param depth {number} - is for current depth
 * @returns {number} - max depth of a ndoe
 */
function getMaxDepth(root: BinTreeNode | undefined | null, depth = 0): number {
  if (!root) return depth
  return Math.max(
    getMaxDepth(root?.left, depth + 1),
    getMaxDepth(root?.right, depth + 1),
  )
}
