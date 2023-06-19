import "./App.css"
import FileReader from "./features/FileReader/FileReader"
import JsonTextArea from "./features/JsonEditor/JsonTextArea"
import React from "react"
import BinTree from "./features/BinTree/BinTree"

function App() {
  return (
    <div className="flex flex-col justify-center  w-full items-start p-5 lg:p-20">
      <FileReader></FileReader>
      <div className="flex w-full flex-col md:flex-row">
        <JsonTextArea></JsonTextArea>
        <div className="divider divider-horizontal sm:divider-horizontal"></div>
        <BinTree></BinTree>
      </div>
    </div>
  )
}

export default App
