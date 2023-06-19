import "./App.module.css"
import FileReader from "./features/FileReader/FileReader"
import JsonTextArea from "./features/JsonEditor/JsonTextArea"
import React from "react"
import BinTree from "./features/BinTree/BinTree"
import styles from "./App.module.css"
function App() {
  return (
    <div className={styles.container}>
      <FileReader></FileReader>
      <div className={styles.fileArea}>
        <JsonTextArea></JsonTextArea>
        <div className={styles.dividerBar}></div>
        <BinTree></BinTree>
      </div>
    </div>
  )
}

export default App
