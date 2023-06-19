import "./App.css"
import FileReader from "./features/FileReader/FileReader"
import JsonTextArea from "./features/JsonEditor/JsonTextArea"
import React from "react"
import BinTree from "./features/BinTree/BinTree"

function App() {
  return (
    <div className="flex flex-col justify-center  w-full items-start p-20">
      <FileReader></FileReader>
      <JsonTextArea></JsonTextArea>
      <BinTree></BinTree>
    </div>
  )
}

export default App
