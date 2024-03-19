import React from "react";
import { render } from "@testing-library/react";
import Card from "../components/Card";

describe("Card component", () => {
  test("renders card with correct name and email", () => {
    const { getByText } = render(
      <Card
        first_name="Stephanie"
        last_name="Acosta"
        email="stephanie@example.com"
        favorite={false}
        avatar="avatar.jpg"
      />
    );

    expect(getByText("Stephanie")).toBeTruthy();
    expect(getByText("Acosta")).toBeTruthy();
    expect(getByText("stephanie@example.com")).toBeTruthy();
  });

  test("renders card with favorite circle if favorite is true", () => {
    const { container } = render(
      <Card
        first_name="Stephanie"
        last_name="Acosta"
        email="stephanie@example.com"
        favorite={true}
        avatar="avatar.jpg"
      />
    );

    const avatar = container.querySelector(".avatar.circle");
    expect(avatar).toBeTruthy(); // El avatar debe tener la clase circle si favorite es true
  });
});
