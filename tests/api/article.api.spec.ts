import { test, expect } from '../../fixtures/test.fixture';
import { ArticleApi } from '../../api/article-api';
import type { ArticleResponse } from '../../types/article';
import { ArticleTestData } from '../../test-data/article-test-data';


// helper to create a test article, a prerequisite setup for other tests that need an existing article
async function createTestArticle(
    articleApi: ArticleApi
    ): Promise<ArticleResponse['article']> {

        const createData = ArticleTestData.createArticle();
        
        const response = await articleApi.createArticle(createData);
        
        expect(response.status(), 'prerequisite article creation failed').toBe(201);
        const body = (await response.json()) as ArticleResponse;
        return body.article;
    }

test.describe('Article API', () => {

    test.describe('POST /articles', () => {

        test('user can create an article', { tag: '@smoke' }, async ({ authenticatedRequest }) => {
            const articleApi = new ArticleApi(authenticatedRequest);
            const createData = ArticleTestData.createArticle();

            let articleSlug: string | undefined;

            try {
                const response = await articleApi.createArticle(createData);

                expect(response.status()).toBe(201);

                const body = (await response.json()) as ArticleResponse;
                articleSlug = body.article.slug;

                expect(body.article.title).toBe(createData.title);
                expect(body.article.description).toBe(createData.description);
                expect(body.article.body).toBe(createData.body);
                expect(body.article.author.username).toBe(process.env.TEST_USERNAME!);
                expect(body.article.slug).toBeTruthy();

            } finally {
                // cleanup still runs if the test fails
                if (articleSlug) {
                    await articleApi.deleteArticle(articleSlug);
                }
            }
        });
    });

    test.describe('PUT /articles/:slug', () => {

        test('user can update an article', async ({ authenticatedRequest }) => {
            const articleApi = new ArticleApi(authenticatedRequest);
            let currentSlug: string | undefined;

            try {
                const article = await createTestArticle(articleApi);
                currentSlug = article.slug;

                const editData = ArticleTestData.updateArticle();
                const response = await articleApi.updateArticle(currentSlug, editData);

                expect(response.status()).toBe(200);

                const body = (await response.json()) as ArticleResponse;

                // update currentSlug — changing title will generate a new slug
                currentSlug = body.article.slug;

                expect(body.article.title).toBe(editData.title);
                expect(body.article.description).toBe(editData.description);
                expect(body.article.body).toBe(editData.body);
            } finally {
                // cleanup runs even if assertions above fail
                if (currentSlug) await articleApi.deleteArticle(currentSlug);
            }
        });
    });

    test.describe('DELETE /articles/:slug', () => {

        test('user can delete an article', async ({ authenticatedRequest }) => {
            const articleApi = new ArticleApi(authenticatedRequest);

            const article = await createTestArticle(articleApi);
            const response = await articleApi.deleteArticle(article.slug);

            expect(response.status()).toBe(204);

            const getResponse = await articleApi.getArticle(article.slug);
            expect(getResponse.status()).toBe(404);
        });
    });
});
