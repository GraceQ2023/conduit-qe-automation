import type { Locator, Page } from '@playwright/test';

export class ArticlePage {

    readonly articleTitle: Locator;
    readonly articleBody: Locator;
    private readonly primaryArticleMeta: Locator;

    constructor(private readonly page: Page) {
        this.articleTitle = this.page.getByRole('heading', { level: 1 });
        this.articleBody  = this.page.locator('.article-content');
        this.primaryArticleMeta = this.page.locator('.article-meta').first();

    }

    authorLink(username: string): Locator {
        return this.primaryArticleMeta.getByRole('link', {name: username,exact: true});
    }
}
