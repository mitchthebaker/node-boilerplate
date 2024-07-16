import { test, expect } from '@playwright/experimental-ct-react';
import App from './App';

test.use({ viewport: { width: 500, height: 500 } });

test('Verify components exist in App.js', async ({ mount }) => {
  const component = await mount(<App />);
  await expect(component).toContainText('Send a message');
  await expect(component).toContainText('Submit');
});
