import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "../components/Button";

describe("Button component", () => {
  test("renders with correct color and children", () => {
    const { container, getByText } = render(
      <Button color="green">Click me</Button>
    );

    const button = container.firstChild;
    expect(button.classList.contains("button-success")).toBe(true);
    expect(getByText("Click me")).toBeTruthy();
  });

  test("executes onClick function when clicked", () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button color="red" onClick={onClickMock}>
        Click me
      </Button>
    );

    fireEvent.click(getByText("Click me"));
    expect(onClickMock).toHaveBeenCalled();
  });
});
