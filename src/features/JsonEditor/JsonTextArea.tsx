import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setEditedValue } from "../../app/fileSlice"

const JsonTextArea = () => {
  const json = useAppSelector((state) => state.file.parsedValue)
  const dispatch = useAppDispatch()

  const [content, setContent] = useState<string>()
  useEffect(() => {
    setContent(JSON.stringify(json, undefined, 4))
  }, [json])

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
    dispatch(setEditedValue(e.target.value))
  }

  const resetHandler = () => {
    const resetString = JSON.stringify(json, undefined, 4)
    setContent(resetString)
    dispatch(setEditedValue(resetString))
  }

  const prettyHandler = () => {
    try {
      content && setContent(JSON.stringify(JSON.parse(content), undefined, 4))
    } catch (e) {}
  }
  return (
    <div className="grid place-items-center w-full lg:w-1/2 flex-shrink">
      <textarea
        className="textarea textarea-primary w-full p-2 textarea-lg"
        rows={10}
        cols={20}
        value={content}
        onChange={changeHandler}
      ></textarea>
      <div>
        <button className={"btn btn-primary mr-3 my-3"} onClick={resetHandler}>
          Reset
        </button>
        <button className={"btn btn-secondary"} onClick={prettyHandler}>
          Formatting
        </button>
      </div>
    </div>
  )
}

export default JsonTextArea
