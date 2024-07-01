import React from "react";
import { Input } from "./input";

describe("<Input />", () => {
  it("should display placeholder", () => {
    cy.mount(<Input placeholder="Leave a Hint" />);
    cy.get("input")
      .should("have.attr", "placeholder")
      .should("include", "Leave a Hint");
  });

  it("should be able to leave text", () => {
    cy.mount(<Input />);
    cy.get("input").type("hello").should("have.value", "hello");
    cy.get("input").type(" world").should("have.value", "hello world");
    cy.get("input").clear().should("have.value", "");
  });
});
