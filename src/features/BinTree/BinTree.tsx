import React, { useCallback, useMemo } from "react"
import { useAppSelector } from "../../app/hooks"
import { BinTreeNode } from "../../utils/parseArrayToTree"
const isObjectEmpty = (objectName: unknown) => {
  return (
    objectName &&
    Object.keys(objectName).length === 0 &&
    objectName.constructor === Object
  )
}
type TreeNodeProps = {
  node: BinTreeNode | null | undefined
}
const TreeNode = ({ node }: TreeNodeProps) => {
  if (!node || isObjectEmpty(node)) {
    return (
      <div
        className={
          "border-2 border-green-700 flex flex-col justify-start items-center w-full m-2"
        }
      ></div>
    )
  }
  return (
    <div className="border-2 border-amber-900 flex flex-col justify-start items-center m-2 ">
      <h3>{node?.id}</h3>
      <div className="m-10 flex flex-row w-full justify-around">
        {<TreeNode node={node?.left} />}
        {<TreeNode node={node?.right} />}
      </div>
    </div>
  )
}
const BinTree = () => {
  const json = useAppSelector((state) => state.file.editedValue)

  return (
    <div className="">
      <h2>output:</h2>
      <div className="card bg-base-100 shadow-xl w-full my-10 bg-base-300 px-5">
        <TreeNode node={json} />
      </div>
    </div>
  )
}

export default BinTree
