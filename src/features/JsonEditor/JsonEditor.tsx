import React, { useState } from "react"
import { useAppSelector } from "../../app/hooks"

function isObject(value: unknown) {
  const type = typeof value
  return value != null && (type == "object" || type == "function")
}

type JSONItemProps = {
  objKey: string
  objValue: any
}
const JsonItem = ({ objKey, objValue }: JSONItemProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true)
  const renderValue = () => {
    if (isObject(objValue)) {
      return Object.entries(objValue).map(([k, v]) => (
        <>
          <JsonItem objKey={k} objValue={v} key={k}></JsonItem>
        </>
      ))
    } else {
      return objValue
    }
  }

  const getSign = () => {
    if (!isObject(objValue)) return ""

    return isExpanded ? "-" : "+"
  }
  return (
    <div className={"relative left-10 mt-3 mb-3"}>
      <span onClick={() => setIsExpanded(!isExpanded)}>{getSign()}</span>
      <span contentEditable className={"p-2"}>
        {objKey}
      </span>
      {isExpanded && renderValue()}
    </div>
  )
}

const JsonEditor = () => {
  const json = useAppSelector((state) => state.file.parsedValue)

  return (
    <div className={"text-left w-full shadow-2xl rounded-2xl p-10 text-xl"}>
      <JsonItem objKey={""} objValue={json}></JsonItem>
    </div>
  )
}

export default JsonEditor
