import { test, expect } from '../../fixtures/test.fixture';

test.describe('Login UI', () => {

    test('log in with valid credentials', async ({ homePage, loginPage, header, page }) => {

        await homePage.navigate();
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
