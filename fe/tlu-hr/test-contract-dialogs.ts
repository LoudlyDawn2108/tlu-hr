import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const screenshotsDir = './test-screenshots';
try {
  mkdirSync(screenshotsDir, { recursive: true });
} catch (e) {
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('1. Navigating to personnel list...');
    await page.goto('http://localhost:5173/tccb/personnel');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `${screenshotsDir}/01-personnel-list.png` });
    console.log('   Screenshot saved: 01-personnel-list.png');

    console.log('2. Clicking on first personnel...');
    const firstRow = await page.locator('table tbody tr').first();
    await firstRow.click();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `${screenshotsDir}/02-personnel-detail.png` });
    console.log('   Screenshot saved: 02-personnel-detail.png');

    console.log('3. Clicking on Contracts tab...');
    await page.getByRole('tab', { name: /Hợp đồng/ }).click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `${screenshotsDir}/03-contracts-tab.png` });
    console.log('   Screenshot saved: 03-contracts-tab.png');

    console.log('4. Clicking "Gia hạn" (Extend) button...');
    const extendButton = page.locator('button:has-text("Gia hạn")').first();
    if (await extendButton.isVisible().catch(() => false)) {
      await extendButton.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: `${screenshotsDir}/04-extend-dialog-open.png` });
      console.log('   Screenshot saved: 04-extend-dialog-open.png');
      console.log('5. Filling extension form...');
      await page.fill('input[id="newContractNumber"]', 'HDTEST/2025');
      await page.fill('input[id="newSignDate"]', '2025-02-03');
      await page.fill('input[id="newEffectiveDate"]', '2025-02-03');
      await page.fill('input[id="newExpiryDate"]', '2025-12-31');
      await page.fill('input[id="appendixNumber"]', 'PL-001');
      await page.screenshot({ path: `${screenshotsDir}/05-extend-dialog-filled.png` });
      console.log('   Screenshot saved: 05-extend-dialog-filled.png');
      await page.click('button:has-text("Hủy")');
      await page.waitForTimeout(500);
    } else {
      console.log('   No extend button found - no active contracts');
    }

    console.log('6. Clicking "Chấm dứt" (Terminate) button...');
    const terminateButton = page.locator('button:has-text("Chấm dứt")').first();
    if (await terminateButton.isVisible().catch(() => false)) {
      await terminateButton.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: `${screenshotsDir}/06-terminate-dialog-open.png` });
      console.log('   Screenshot saved: 06-terminate-dialog-open.png');
      console.log('7. Filling termination form...');
      await page.fill('input[id="terminationDate"]', '2025-02-03');
      await page.fill('input[id="reason"]', 'Thôi việc theo nguyện vọng');
      await page.screenshot({ path: `${screenshotsDir}/07-terminate-dialog-filled.png` });
      console.log('   Screenshot saved: 07-terminate-dialog-filled.png');
      await page.click('button:has-text("Hủy")');
      await page.waitForTimeout(500);
    } else {
      console.log('   No terminate button found - no active contracts');
    }

    console.log('8. Clicking "Thêm hợp đồng" (Add Contract) button...');
    const addButton = page.locator('button:has-text("Thêm hợp đồng")');
    if (await addButton.isVisible().catch(() => false)) {
      await addButton.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: `${screenshotsDir}/08-add-contract-page.png` });
      console.log('   Screenshot saved: 08-add-contract-page.png');
    } else {
      console.log('   Add contract button not found');
    }

    console.log('\n✅ All verifications completed!');
    console.log(`Screenshots saved to: ${screenshotsDir}/`);
    
  } catch (error) {
    console.error('❌ Error:', error);
    await page.screenshot({ path: `${screenshotsDir}/error.png` });
  } finally {
    await browser.close();
  }
})();
