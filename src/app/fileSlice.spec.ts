import fileReducer, {
  FileState,
  setEditedValue,
  setFileContent,
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

  it("should have parsed value if it is valid", function () {
    const actual = fileReducer(
      initialState,
      setFileContent('["a", ["b"], ["c"]]'),
    )
    expect(actual.parsedValue).toEqual({
      id: "a",
      left: {
        id: "b",
      },
      right: {
        id: "c",
      },
    })
  })

  it("should set error to true if json string is invalid", () => {
    const actual = fileReducer(initialState, setFileContent("[1,]"))
    expect(actual.fileContent).toEqual("[1,]")
    expect(actual.parsedValue).toEqual(null)
    expect(actual.error).toEqual(true)
  })

  it("should update edited value if user input is valid", function () {
    const actual = fileReducer(
      initialState,
      setEditedValue(`{
          "id": 1,
          "left": {
              "id": 2
          },
          "right": {
              "id": 3,
              "left": null,
              "right": {
                  "id": 5
              }
          }
      }`),
    )
    expect(actual.editedValue).toEqual({
      id: 1,
      left: {
        id: 2,
      },
      right: {
        id: 3,
        left: null,
        right: {
          id: 5,
        },
      },
    })
    expect(actual.error).toEqual(false)
  })

  it("should update edited value if user input is invalid", function () {
    const actual = fileReducer(initialState, setEditedValue(`{...}`))

    expect(actual.editedError).toEqual(true)
  })
})
