describe("Map", () => {
  beforeEach(() => {
    cy.viewport("iphone-8");
  });

  it("should contain footer menu", () => {
    cy.visit({
      url: "/map",
      method: "POST",
      headers: {
        "user-agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
      },
    });
  });
});
