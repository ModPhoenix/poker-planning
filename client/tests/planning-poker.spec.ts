import { test, expect, type Page } from "@playwright/test";

test.describe("Planning Poker Estimation", () => {
  let pages: Page[];

  test.beforeAll(async ({ browser }) => {
    // Create three browser contexts for three different users
    pages = await Promise.all([
      browser.newPage(),
      browser.newPage(),
      browser.newPage(),
    ]);
  });

  test.afterAll(async () => {
    await Promise.all(pages.map((page) => page.close()));
  });

  test("should allow multiple users to join a room and estimate a task", async () => {
    // User 1 creates a new room
    await pages[0].goto("http://localhost:5173");
    await pages[0].getByRole("button", { name: "Start New Game" }).click();
    await pages[0].getByLabel("Username", { exact: true }).fill("User 1");
    await pages[0].getByRole("button", { name: "Join room" }).click();
    await expect(pages[0].getByText("User 1")).toBeVisible();
    await expect(pages[0].getByText("Just start picking cards!")).toBeVisible();

    // Get the room URL
    const roomUrl = pages[0].url();

    // Create users and join the room
    for (let i = 1; i < pages.length; i++) {
      const username = `User ${i + 1}`;
      await pages[i].goto(roomUrl);
      await pages[i].getByLabel("Username", { exact: true }).fill(username);
      await pages[i].getByRole("button", { name: "Join room" }).click();

      // Wait for the user to be added to the room
      await expect(pages[i].getByText(username)).toBeVisible();
    }

    // Wait for all users to be visible in the room
    for (const page of pages) {
      await expect(page.getByTestId("player")).toHaveCount(3);
    }

    // Users make their estimations
    const estimations = ["3", "5", "8"];
    for (let i = 0; i < pages.length; i++) {
      // getByRole("button", { name: "8", exact: true });
      await pages[i]
        .getByRole("button", { name: estimations[i], exact: true })
        .click();
    }

    // User 1 reveals the estimations
    await pages[0].getByRole("button", { name: "Reveal cards" }).click();

    // Verify results are visible for all users
    for (const page of pages) {
      await expect(page.getByText("average")).toBeVisible();
    }

    // Check for vote distribution chart
    await expect(pages[0].getByTestId("vote-distribution-chart")).toBeVisible();

    // User 1 starts a new round
    await pages[0].getByRole("button", { name: "Start New Game" }).click();
    // Confirmation dialog Are you sure you want to start a new game?

    await expect(
      pages[0].getByText("Are you sure you want to start a new game?"),
    ).toBeVisible();
    await pages[0].getByRole("button", { name: "Start New Game" }).click();

    // Verify that the voting area is reset for all users
    for (const page of pages) {
      await expect(page.getByText("average")).not.toBeVisible();
      await expect(
        page.getByTestId("vote-distribution-chart"),
      ).not.toBeVisible();
      await expect(page.getByText("Just start picking cards!")).toBeVisible();
    }
  });
});
