import { TInputArr, parseArrayToTree } from "./parseArrayToTree"

describe("parse if no leaf", () => {
  it("should parse with no left and right", () => {
    const input = ["a", ["b"], ["c"]] satisfies TInputArr
    expect(parseArrayToTree(input)).toEqual({
      id: "a",
      left: {
        id: "b",
      },
      right: {
        id: "c",
      },
    })
  })

  it("should parse with leaves", () => {
    const input = [1, [2], [3, null, [5]]] satisfies TInputArr
    const res = {
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
    }
    expect(parseArrayToTree(input)).toEqual(res)
  })
})
