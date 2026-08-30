import type { Locator, Page } from '@playwright/test';
import { CreateArticleRequest, UpdateArticleRequest } from '../types/article';

export class EditorPage {

    readonly titleInput: Locator;
    readonly descriptionInput: Locator;
    readonly bodyInput: Locator;
    readonly tagsInput: Locator;
    readonly publishButton: Locator;

    constructor(private readonly page: Page) {
        this.titleInput       = this.page.getByRole('textbox', { name: 'Article Title' });
        this.descriptionInput = this.page.getByRole('textbox', { name: "What's this article about?" });
        this.bodyInput        = this.page.getByRole('textbox', { name: 'Write your article (in markdown)' });
        this.tagsInput        = this.page.getByRole('textbox', { name: 'Enter tags' });
        this.publishButton      = this.page.getByRole('button',  { name: 'Publish Article' });
    }

    async navigate() {
        await this.page.goto('/editor');
    }


    async createArticle(
        article:CreateArticleRequest
    ): Promise<void> {
        await this.titleInput.fill(article.title);
        await this.descriptionInput.fill(article.description);
        await this.bodyInput.fill(article.body);
        for (const tag of article.tagList ?? []) {
            await this.tagsInput.fill(tag);
            await this.tagsInput.press('Enter');
        }
        await this.publishButton.click();
    }


    async editArticle(
        article:UpdateArticleRequest
    ): Promise<void> {

        if (article.title !== undefined) {
            await this.titleInput.fill(article.title);
        }

        if (article.description !== undefined) {
            await this.descriptionInput.fill(article.description);
        }

        if (article.body !== undefined) {
            await this.bodyInput.fill(article.body);
        }
        
        await this.publishButton.click();
    }
}