import { test, expect } from "@playwright/test";

test("home page has correct elements", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await expect(
    page.getByRole("link", { name: "PokerPlanning.org Logo" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Streamline Your Agile" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Toggle theme" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Start Estimating" }),
  ).toBeVisible();
  await expect(page.getByText("Elevate Your Scrum Planning")).toBeVisible();
});
