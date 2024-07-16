import { test, expect } from '@playwright/experimental-ct-react';
import Form from './Form';
import MessagesList from "./MessagesList";
test.use({ viewport: { width: 500, height: 500 } });

const inputSelector = "[id='message-input']"; 
const submitSelector = "[id='submission-button']"; 
const messagesListSelector = "[id='messages-list']";

test("Verify text changes are stored in input", async ({ mount }) => {
  const FormComponent = await mount(<Form />);
  await FormComponent.locator(inputSelector).fill("Test message");
  await expect(FormComponent.locator(inputSelector)).toHaveValue("Test message");
});

test("Verify form submission displays a new message", async ({ mount }) => {
  const FormComponent = await mount(<Form />);
  await FormComponent.locator(inputSelector).fill("Test message");
  await expect(FormComponent.locator(inputSelector)).toHaveValue("Test message");
  await FormComponent.locator(submitSelector).click();
  //await page.goto("localhost:3000");
  //await page.fill(inputSelector, "Test message");
  //await page.click(submitSelector);
  //await page.reload(); 
  //await page.waitForLoadState("load");
  //await expect(page.locator(messagesListSelector)).toContainText("Test message");
});