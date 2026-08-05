import { test, expect } from '../../fixtures/test.fixture';

test.describe('Publish Article UI Tests', () => {

    test('authenticated user can create a new article', async ({
        page,
        homePage,
        loginPage,
        header,
        editorPage,
        articlePage,
    }) => {
        // --- Login ---
        await homePage.navigate();
        await header.signInLink.click();
        await loginPage.login(process.env.TEST_EMAIL!, process.env.TEST_PASSWORD!);
        await expect(page).toHaveURL('/');

        // --- Navigate to editor ---
        await header.newArticleLink.click();
        await expect(page).toHaveURL('/editor');

        // --- Unique article data ---
        const timestamp = new Date()
            .toISOString()
            .slice(2, 16)
            .replace(/[-:T]/g, '');

        const title       = `Test Article ${timestamp}`;
        const description = `Description ${timestamp}`;
        const body        = `Body content ${timestamp}`;
        const tags        = [`playwright`];
        const expectedSlug = title.replace(/\s+/g, '-');

        // --- Publish ---
        await editorPage.createArticle(title, description, body, tags);
        await expect(page).toHaveURL(new RegExp(`/article/${expectedSlug}`)
);

        // --- Verify published article ---
        await expect(articlePage.articleTitle).toHaveText(title);
        await expect(articlePage.articleBody).toContainText(body);
        await expect(articlePage.authorLink(process.env.TEST_USERNAME!)).toBeVisible();
    });

});
