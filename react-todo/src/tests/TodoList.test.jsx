import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList";

test("renders initial todos", () => {
  render(<TodoList />);
  expect(screen.getByText("Learn React")).toBeInTheDocument();
  expect(screen.getByText("Build projects")).toBeInTheDocument();
});

test("adds a todo", () => {
  render(<TodoList />);
  const input = screen.getByPlaceholderText("New todo");
  fireEvent.change(input, { target: { value: "Write tests" } });
  fireEvent.click(screen.getByText("Add"));
  expect(screen.getByText("Write tests")).toBeInTheDocument();
});

test("toggles a todo", () => {
  render(<TodoList />);
  const item = screen.getByText("Learn React");
  expect(item).not.toHaveStyle("text-decoration: line-through");
  fireEvent.click(item);
  expect(item).toHaveStyle("text-decoration: line-through");
});

test("deletes a todo", () => {
  render(<TodoList />);
  const buttons = screen.getAllByText("Delete");
  fireEvent.click(buttons[0]);
  expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
});
