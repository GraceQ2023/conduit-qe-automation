import { test, expect } from '../../fixtures/test.fixture';
import { ArticleTestData } from '../../test-data/article-test-data';

test.describe('Article Lifecycle UI Tests', () => {

    let articleSlug = '';

    test('authenticated user can create, edit and delete an article', async ({
        page,
        header,
        editorPage,
        articlePage,
    }) => {

        //--- Test data ---
        const createData = ArticleTestData.createArticle();
        const editData = ArticleTestData.updateArticle();


        // --- Create article ---
        await test.step('Create article', async () => {

            await page.goto('/');
            await expect(header.profileLink(process.env.TEST_USERNAME!)).toBeVisible();

            await header.newArticleLink.click();
            await expect(page).toHaveURL('/editor');

            const createResponsePromise = page.waitForResponse(
                response =>
                    response.url().includes('/api/articles') &&
                    response.request().method() === 'POST'
            );

            await editorPage.createArticle(createData);

            const createResponse = await createResponsePromise;
            const createBody = await createResponse.json();

            articleSlug = createBody.article.slug;

            await expect(page).toHaveURL(new RegExp(`/article/${articleSlug}`));

            // --- Verify published article ---
            await expect(articlePage.articleTitle).toHaveText(createData.title);
            await expect(articlePage.articleBody).toContainText(createData.body);
            await expect(articlePage.authorLink(process.env.TEST_USERNAME!)).toBeVisible();
        });


        await test.step('Edit article', async () => {

            await articlePage.navigateToEdit();
            await expect(page).toHaveURL(new RegExp(`/editor/${articleSlug}`));

            const updateResponsePromise = page.waitForResponse(
                response =>
                    response.url().includes(`/api/articles/${articleSlug}`) &&
                    response.request().method() === 'PUT'
            );

            await editorPage.editArticle(editData);

            const updateResponse = await updateResponsePromise;
            const updateBody = await updateResponse.json();

            articleSlug = updateBody.article.slug;

            await expect(page).toHaveURL(new RegExp(`/article/${articleSlug}`));

            // --- Verify updated article ---
            await expect(articlePage.articleTitle).toHaveText(editData.title);
            await expect(articlePage.articleBody).toContainText(editData.body);
        });

        await test.step('Delete article', async () => {
            await articlePage.deleteArticle();
            await expect(page).toHaveURL('/');
        });
    });
});
