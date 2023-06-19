import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import FileReader from "./FileReader"
import { Provider } from "react-redux"
import { store } from "../../app/store"
import { Simulate } from "react-dom/test-utils"
import error = Simulate.error

test("should accept file", async () => {
  const user = userEvent.setup()

  const file = new File([], "test.json", {
    type: "application/json",
  })
  render(
    <Provider store={store}>
      <FileReader></FileReader>
    </Provider>,
  )
  const input = screen.getByLabelText(/upload file/i) as HTMLInputElement
  await user.upload(input, file)
  expect(input?.files?.[0]).toBe(file)
  expect(input?.files?.item(0)).toBe(file)
  expect(input.files).toHaveLength(1)
})
