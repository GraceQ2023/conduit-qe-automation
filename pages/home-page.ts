import type { Page } from '@playwright/test';

export class HomePage {
    constructor(private readonly page: Page) {}

    async navigate() {
        await this.page.goto('/');
    }
}