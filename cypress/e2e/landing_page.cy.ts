import { BrowserMultiFormatReader } from "@zxing/browser";

describe("Mobile users", () => {
  it("should be able to enter the map", () => {
    cy.viewport("iphone-8");
    cy.visit({
      url: "/map",
      method: "POST",
      headers: {
        "user-agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
      },
    });
    cy.url().should("include", "/map");
  });

  it("should be able to enter the leaderboard", () => {
    cy.viewport("iphone-8");
    cy.visit({
      url: "/leaderboard",
      method: "POST",
      headers: {
        "user-agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
      },
    });
    cy.url().should("include", "/leaderboard");
  });

  it("should be able to enter the account page", () => {
    cy.viewport("iphone-8");
    cy.visit({
      url: "/login",
      method: "POST",
      headers: {
        "user-agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
      },
    });
    cy.url().should("include", "/login");
  });

  it("should be able to enter the tutorial page", () => {
    cy.viewport("iphone-8");
    cy.visit({
      url: "/how-to-play",
      method: "POST",
      headers: {
        "user-agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
      },
    });
    cy.url().should("include", "/how-to-play");
  });
});

describe("Desktop users", () => {
  it("should not be able to enter the map", () => {
    cy.visit({
      url: "/map",
    });
    cy.url().should("include", "/landing");
  });

  it("should not be able to enter the leaderboard", () => {
    cy.visit({
      url: "/leaderboard",
    });
    cy.url().should("include", "/landing");
  });

  it("should not be able to enter the account page", () => {
    cy.visit({
      url: "/login",
    });
    cy.url().should("include", "/landing");
  });

  it("should not be able to enter the tutorial page", () => {
    cy.visit({
      url: "/how-to-play",
    });
    cy.url().should("include", "/landing");
  });
});

describe("The logo", () => {
  it("should contain src as poipoi.img", () => {
    cy.visit("/");
    cy.get("#logo").should("have.attr", "src").and("include", "Poipoi");
  });
});

describe("The Creator Link", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should navigate to Nattawat Github", async () => {
    cy.get("#Nattawat")
      .should("have.attr", "href")
      .and("include", "departurelv");
  });

  it("should navigate to Jarrod Github", async () => {
    cy.get("#Jarrod").should("have.attr", "href").and("include", "J-Ariola");
  });

  it("should navigate to Dominik Github", async () => {
    cy.get("#Dominik")
      .should("have.attr", "href")
      .and("include", "dominiksakic");
  });

  it("should navigate to Ning Github", async () => {
    cy.get("#Ning").should("have.attr", "href").and("include", "NChang55");
  });

  it("should navigate to Jacob Github", async () => {
    cy.get("#Jacob").should("have.attr", "href").and("include", "Flumanuck");
  });

  it("should navigate to Deana Github", async () => {
    cy.get("#Deana").should("have.attr", "href").and("include", "deanachou");
  });
});

describe("QR Code", () => {
  it("should be poipoi.vercel", () => {
    cy.visit("/");
    cy.get("#QRcode")
      .then(($el) => {
        const img = $el[0] as HTMLImageElement;
        const image = new Image();
        image.width = img.width;
        image.height = img.height;
        image.src = img.src;
        image.crossOrigin = "Anonymous";
        return image;
      })
      .then((image) => {
        const reader = new BrowserMultiFormatReader();
        return reader.decodeFromImageElement(image[0]);
      })
      .then((result) => {
        expect(result.getText()).to.equal("https://poipoi.vercel.app/map");
      });
  });
});
