import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setEditedValue } from "../../app/FileReaderSlice"

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
  return (
    <textarea
      className="textarea textarea-primary w-2/3 p-2 textarea-lg"
      rows={10}
      cols={40}
      value={content}
      onChange={changeHandler}
    ></textarea>
  )
}

export default JsonTextArea
