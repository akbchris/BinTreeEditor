import fileReducer, {
  setFileContent,
  setEditedValue,
  FileState,
} from "./fileSlice"

describe("file reducer", () => {
  const initialState: FileState = {
    fileContent: "",
    parsedValue: null,
    editedValue: null,
    error: false,
    editedError: false,
  }
  it("should handle initial state", () => {
    expect(fileReducer(undefined, { type: "unknown" })).toEqual({
      fileContent: "",
      parsedValue: null,
      editedValue: null,
      error: false,
      editedError: false,
    })
  })

  it("should handle setFileContent", () => {
    const actual = fileReducer(initialState, setFileContent("[1,2,3]"))
    expect(actual.fileContent).toEqual("[1,2,3]")
  })
})
