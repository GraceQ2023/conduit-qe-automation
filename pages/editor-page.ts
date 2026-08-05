import type { Locator, Page } from '@playwright/test';

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

    async createArticle(title: string, description: string, body: string, tags: string[]): Promise<void> {
        await this.titleInput.fill(title);
        await this.descriptionInput.fill(description);
        await this.bodyInput.fill(body);
        for (const tag of tags) {
            await this.tagsInput.fill(tag);
            await this.tagsInput.press('Enter');
        }
        await this.publishButton.click();
    }
}
