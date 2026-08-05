import { test, expect } from '../../fixtures/test.fixture';
import { ArticleApi } from '../../api/article-api';
import type { CreateArticleResponse } from '../../types/article';

test.describe('Article API', () => {

    test.describe('POST /articles', () => {

        test('user can create an article', async ({authenticatedRequest}) => {

            const articleApi = new ArticleApi(authenticatedRequest);
            let articleSlug: string | undefined;

            try {
                const articleData = {
                    title: `Test Article ${Date.now()}`,
                    description: 'Created through Playwright API testing',
                    body: 'This article was created by an automated API test.',
                    tagList: ['playwright', 'api'],
                };

                const response = await articleApi.createArticle(articleData);

                expect(response.status()).toBe(201);

                const body = (await response.json()) as CreateArticleResponse;
                articleSlug = body.article.slug;

                expect(body.article.title).toBe(articleData.title);
                expect(body.article.slug).toBeTruthy();
                expect(body.article.author.username).toBe(process.env.TEST_USERNAME!);

            } finally {
                
                if(articleSlug) {
                    // Clean up the created article if necessary
                    await authenticatedRequest.delete(`${process.env.API_URL}articles/${articleSlug}`);
                }
            }
        });






    });
});