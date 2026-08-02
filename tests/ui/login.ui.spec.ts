import { test, expect } from '../../fixtures/test.fixture';

test.describe('Login UI', () => {

    test('log in with valid credentials', async ({ loginPage, page }) => {
        await loginPage.navigate();
        await expect(page).toHaveURL('/login');
        
        await loginPage.login(process.env.TEST_EMAIL!, process.env.TEST_PASSWORD!);

        await expect(page).toHaveURL('/');
        await expect(page.getByRole('link', { name: process.env.TEST_USERNAME! })).toBeVisible();
    });

});
