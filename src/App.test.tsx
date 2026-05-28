import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("moves an edited active task to completed and back", () => {
  render(<App />);

  userEvent.type(screen.getByPlaceholderText("Enter a task"), "Original task");
  userEvent.click(screen.getByRole("button", { name: "Go" }));

  userEvent.click(screen.getByRole("button", { name: "Edit task" }));
  const editInput = screen.getByDisplayValue("Original task");
  userEvent.clear(editInput);
  userEvent.type(editInput, "Edited task");

  userEvent.click(screen.getByRole("button", { name: "Move task to completed" }));

  const completedColumn = screen.getByText("Completed Tasks").parentElement;
  expect(completedColumn).not.toBeNull();
  expect(within(completedColumn as HTMLElement).getByText("Edited task")).toBeInTheDocument();

  userEvent.click(screen.getByRole("button", { name: "Move task back to active" }));

  const activeColumn = screen.getByText("Active Tasks").parentElement;
  expect(activeColumn).not.toBeNull();
  expect(within(activeColumn as HTMLElement).getByText("Edited task")).toBeInTheDocument();
});
