import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByTestId("app");
  expect(linkElement).toBeInTheDocument();
});

test("render search input", () => {
  render(<App />);
  const searchInput = screen.getByTestId("search-input");
  expect(searchInput).toBeInTheDocument();
});

test("searchbox is working?", () => {
  render(<App />);
  const searchInput = screen.getByTestId("search-input");
  userEvent.type(searchInput, "test");
  expect(searchInput.value).toBe("test");
});
