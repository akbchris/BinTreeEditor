import React, { ReactNode, useState } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { setFileContent } from "../../app/FileReaderSlice"
import styles from "./FileReader.module.css"
import cn from "classnames"

type ErrorAlertProps = {
  children: ReactNode
}
const ErrorAlert = ({ children }: ErrorAlertProps) => (
  <div className="alert alert-error">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="stroke-current shrink-0 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <span>{children}</span>
  </div>
)

const FileReader = () => {
  const fileContent = useAppSelector((state) => state.file.fileContent)
  const error = useAppSelector((state) => state.file.error)
  const edittedError = useAppSelector((state) => state.file.editedError)
  const dispatch = useAppDispatch()
  const [fileSelect, setFileSelect] = useState<File>()

  const handleFileRead = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) {
      return
    }
    setFileSelect(file)
  }

  return (
    <div className={cn("prose", styles.container)}>
      <div className="flex flex-row my-3 join">
        <input
          type="file"
          accept=".txt,  .json"
          onChange={handleFileRead}
          className={styles.fileInput}
        />
        <button
          className="btn join-item"
          onClick={() => {
            const reader = new window.FileReader()

            reader.onload = (e) => {
              if (e?.target?.result && typeof e?.target.result === "string") {
                dispatch(setFileContent(e?.target?.result))
              }
            }

            fileSelect && reader.readAsText(fileSelect)
          }}
        >
          Fetch
        </button>
      </div>

      <div>
        <h2>File Contents:</h2>
        <p>{fileContent}</p>
        {error && <ErrorAlert>Parsing Error</ErrorAlert>}
        {edittedError && (
          <ErrorAlert>Invalid JSON string, Please verify your input</ErrorAlert>
        )}
      </div>
    </div>
  )
}

export default FileReader
