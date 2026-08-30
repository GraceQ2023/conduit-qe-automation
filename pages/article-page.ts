import type { Locator, Page } from '@playwright/test';

export class ArticlePage {

    readonly articleTitle: Locator;
    readonly articleBody: Locator;
    readonly editArticleLink: Locator;
    readonly deleteArticleButton: Locator;
    private readonly articleMeta: Locator;

    constructor(private readonly page: Page) {
        this.articleTitle = this.page.getByRole('heading', { level: 1 });
        this.articleBody  = this.page.locator('.article-content');
        this.articleMeta = this.page.locator('.article-meta').first();

        this.editArticleLink = page.getByRole('link', { name: /Edit Article/ }).first();
        
        this.deleteArticleButton = page.getByRole('button', { name: /Delete Article/ }).first();
    }

    authorLink(username: string): Locator {
        return this.articleMeta.getByRole('link', {name: username,exact: true});
    }

    async navigateToEdit(): Promise<void> {
        await this.editArticleLink.click();
    }

    async deleteArticle(): Promise<void> {
        await this.deleteArticleButton.click();
    }
}
