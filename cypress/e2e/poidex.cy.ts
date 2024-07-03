describe("Map", () => {
  beforeEach(() => {
    cy.viewport("iphone-8");
    cy.visit({
      url: "/map",
      method: "POST",
      headers: {
        "user-agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
      },
    });
    cy.wait(2000);
  });

  it("should open the PoidexModal when the collection button is clicked", () => {
    cy.get('[data-testid="collection-button"]').as("collectionButton");

    cy.get('[data-testid="poidex-modal"]').should("not.exist");

    cy.get("@collectionButton").click();

    cy.get('[data-testid="poidex-modal"]').should("exist");
  });
  it("should open the PoidexModal when URL has ?tab=collection", () => {
    cy.visit({
      url: "/map?tab=collection",
      method: "POST",
      headers: {
        "user-agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
      },
    });
    cy.get('[data-testid="poidex-modal"]').should("exist");
  });
});
