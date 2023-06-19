import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { BinTreeNode, parseArrayToTree } from "../utils/parseArrayToTree"

export interface FileState {
  fileContent: string
  parsedValue: BinTreeNode | null
  editedValue: BinTreeNode | null
  error: boolean
  editedError: boolean
}

const initialState: FileState = {
  fileContent: "",
  parsedValue: null,
  editedValue: null,
  error: false,
  editedError: false,
}
export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setFileContent: (state, action: PayloadAction<string>) => {
      state.fileContent = action.payload
      try {
        state.parsedValue = parseArrayToTree(JSON.parse(action.payload))
        state.editedValue = parseArrayToTree(JSON.parse(action.payload))
        state.error = false
      } catch (e: unknown) {
        if (e instanceof Error) state.error = true
      }
    },
    setEditedValue: (state, action: PayloadAction<string>) => {
      try {
        state.editedValue = JSON.parse(action.payload)
        state.editedError = false
      } catch (e: unknown) {
        state.editedError = true
      }
    },
  },
})

export const { setFileContent, setEditedValue } = fileSlice.actions
export default fileSlice.reducer
