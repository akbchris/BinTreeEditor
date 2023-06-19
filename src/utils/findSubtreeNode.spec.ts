import { findSubtreeNodeWithAllDeepestLeaves } from "./findSubtreeNode"
import sample from "./sampleTree2.json"
describe("findSubtreeNode", () => {
  it("should find tree contains all nodes", function () {
    const input = {
      id: 1,
      left: {
        id: 2,
      },
      right: {
        id: 3,
        left: { id: 2 },
        right: { id: 5 },
      },
    }
    expect(findSubtreeNodeWithAllDeepestLeaves(input)?.id).toEqual(3)
  })

  it("should find single node if it is the only deepest node", function () {
    const input = {
      id: 1,
      left: {
        id: 2,
      },
      right: {
        id: 3,
        left: null,
        right: { id: 5 },
      },
    }
    expect(findSubtreeNodeWithAllDeepestLeaves(input)?.id).toEqual(5)
  })
  it("should find c1 as common parent node", function () {
    const input = sample
    expect(findSubtreeNodeWithAllDeepestLeaves(input)?.id).toEqual("c1")
  })
})
