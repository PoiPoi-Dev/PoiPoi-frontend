describe("The Landing Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should navigate to Nattawat Github", async () => {
    cy.get("#Nattawat").click();
    cy.origin("https://github.com", () => {
      cy.url({ timeout: 10000 }).should("include", "/departurelv");
    });
  });

  it("should navigate to Jarrod Github", async () => {
    cy.get("#Jarrod").click();
    cy.origin("https://github.com", () => {
      cy.url({ timeout: 10000 }).should("include", "/J-Ariola");
    });
  });

  it("should navigate to Dominik Github", async () => {
    cy.get("#Dominik").click();
    cy.origin("https://github.com", () => {
      cy.url({ timeout: 10000 }).should("include", "/dominiksakic");
    });
  });

  it("should navigate to Ning Github", async () => {
    cy.get("#Ning").click();
    cy.origin("https://github.com", () => {
      cy.url({ timeout: 10000 }).should("include", "/NChang55");
    });
  });

  it("should navigate to Jacob Github", async () => {
    cy.get("#Jacob").click();
    cy.origin("https://github.com", () => {
      cy.url({ timeout: 10000 }).should("include", "/Flumanuck");
    });
  });

  it("should navigate to Deana Github", async () => {
    cy.get("#Deana").click();
    cy.origin("https://github.com", () => {
      cy.url({ timeout: 10000 }).should("include", "/deanachou");
    });
  });
});
