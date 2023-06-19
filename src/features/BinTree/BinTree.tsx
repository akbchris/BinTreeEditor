import React from "react"
import { useAppSelector } from "../../app/hooks"
import { BinTreeNode } from "../../utils/parseArrayToTree"
import styles from "./BinTree.module.css"
import cn from "classnames"
import { findSubtreeNodeWithAllDeepestLeaves } from "../../utils/findSubtreeNode"

const isObjectEmpty = (objectName: unknown) => {
  return (
    objectName &&
    Object.keys(objectName).length === 0 &&
    objectName.constructor === Object
  )
}
type TreeNodeProps = {
  node: BinTreeNode | null | undefined
  targetValue: number | string | undefined
}
const TreeNode = ({ node, targetValue }: TreeNodeProps) => {
  const isTarget = targetValue === node?.id
  if (!node || isObjectEmpty(node)) {
    return <div className={styles.emptyNode}></div>
  }
  return (
    <div className={cn(styles.normalBorder, { [styles.targetNode]: isTarget })}>
      <h3 className={"text-xl font-bold"}>{node?.id}</h3>
      <div className={styles.childrenContainer}>
        {<TreeNode node={node?.left} targetValue={targetValue} />}
        {<TreeNode node={node?.right} targetValue={targetValue} />}
      </div>
    </div>
  )
}

const BinTree = () => {
  const json = useAppSelector((state) => state.file.editedValue)
  const labeledValue = findSubtreeNodeWithAllDeepestLeaves(json)?.id
  return (
    <div className={styles.container}>
      <TreeNode node={json} targetValue={labeledValue} />
    </div>
  )
}

export default BinTree
