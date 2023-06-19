import React, { ReactNode, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setFileContent } from "../../app/fileSlice"
import styles from "./FileReader.module.css"

type ErrorAlertProps = {
  children: ReactNode
}
const ErrorAlert = ({ children }: ErrorAlertProps) => (
  <div className="alert alert-error w-80">
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
    <div className={styles.container}>
      <div className="flex flex-row my-3 join">
        <label htmlFor="file-uploader">Upload file:</label>
        <input
          id="file-uploader"
          type="file"
          onChange={handleFileRead}
          className={styles.fileInput}
          accept={"application/json, text/*"}
        />
        <button
          className="btn join-item btn-primary"
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

      <h2>File Contents:</h2>
      <p>{fileContent}</p>
      {error && <ErrorAlert>Parsing Error</ErrorAlert>}
      {edittedError && (
        <ErrorAlert>Invalid JSON string, Please verify your input</ErrorAlert>
      )}
    </div>
  )
}

export default FileReader
