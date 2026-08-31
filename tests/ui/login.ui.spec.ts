import { test, expect } from '../../fixtures/test.fixture';


// override the storage state to ensure a clean state, start as a guest 

test.use({storageState: {cookies: [],origins: []}});

test.describe('Login UI', () => {

    test('log in with valid credentials', { tag: '@smoke' }, async ({loginPage, header, page }) => {

        await page.goto('/');
        await expect(header.signInLink).toBeVisible();
        await header.signInLink.click();

        await expect(page).toHaveURL('/login');

        await loginPage.login(
            process.env.TEST_EMAIL!, 
            process.env.TEST_PASSWORD!
        );

        await expect(page).toHaveURL('/');
        await expect(header.newArticleLink).toBeVisible();

        await expect(
            header.profileLink(process.env.TEST_USERNAME!),).toBeVisible();

    });

});
