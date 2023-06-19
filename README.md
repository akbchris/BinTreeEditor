# Binary Tree Editor


Author : Chris Fang

### Run Dev
```sh
npm run dev
```

## Project Overview

This single-page application (SPA) is written in React.js Typescript and uses Redux+Redux Toolkit as its state management tool.

For styling, this project enables CSS modules and uses [Tailwind](https://tailwindcss.com/) and DaisyUI as the design system.

You can access [https://bin-tree-editor.vercel.app/](https://bin-tree-editor.vercel.app/) to view it. All files are bundled by Vite.

### Screenshot

![screenshot](https://github.com/akbchris/BinTreeEditor/assets/29156786/f10e516e-aeb4-49f8-9172-7565b61b7854)

Unit Test Coverage

![test.png](https://github.com/akbchris/BinTreeEditor/assets/29156786/fa3562a7-35b3-426c-b546-0a24c4c1b716)

## Solution 1

There is an function under  src/utils/parseArrayToTree.ts and you can find unit tests under the same folder

```jsx
export function parseArrayToTree(arr: TInputArr): BinTreeNode {
  if (!arr.length) {
    throw new Error("Parsing Error, Please select correct input")
  }
  if (arr.length === 1) {
    // Early return if it doesn't exist
    return new BinTreeNode(arr[0])
  }
  const [id, leftArr, rightArr] = arr

  let leftNode = null
  let rightNode = null
  // recursive parse children nodes if it still contains
  if (Array.isArray(leftArr)) {
    leftNode = parseArrayToTree(leftArr as TInputArr)
  }

  if (Array.isArray(rightArr)) {
    rightNode = parseArrayToTree(rightArr as TInputArr)
  }
  return new BinTreeNode(id, leftNode, rightNode)
}
```

The function checks the length of the input array. If it's empty, an error is thrown. If the length is 1, it creates a leaf node with the single value from the array and returns it to prevent create edge nodes.

If the input array has more than one element, it extracts the **`id`**, **`leftArr`**, and **`rightArr`** values from the array. It then recursively calls **`parseArrayToTree`** for the **`leftArr`** and **`rightArr`** if they exist and assigns the returned **`BinTreeNode`** objects to **`leftNode`** and **`rightNode`**, respectively.

## Solution 3

The requirement is to find the smallest subtree that contains all the deepest nodes and set its border to 2px solid green.

If there is only one deepest node, then the smallest subtree will be that node.

If there are multiple deepest nodes, we need to find the **Lowest Common Ancestor** (LCA) by comparing the height of the left and right nodes.

We can leverage the flexibility of JavaScript by adding a flag directly to the target node, for example: {id:1, target:true}. This can be accomplished in O(1) and allows us to set the target node's border. However, modifying the current tree can have side effects.

Assuming that the node's ID is unique in the binary tree, a better approach would be to memorize the node's ID that we are looking for and compare it each time we render the tree. This avoids the need to modify the current tree and its potential side effects.

Steps

- Find the TreeNode (DFS)
- Get the id of the TreeNode
- When rendering the Bintree component ,check if its id is the target node.

## Extra Enhancement:

- Typescript strict typing
- Parsing Error Indicator
    - can detect the error
- Error Boundry
- Easy to reset the content and format in text area
- Responsive Design
    - Different layout for mobile view
- Accessibility
    - users are allowed to access all the contents in right order
    - semantic html
