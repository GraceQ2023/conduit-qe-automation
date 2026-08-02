import type { Locator, Page } from '@playwright/test';

export class LoginPage {

    readonly emailTextbox: Locator;
    readonly passwordTextbox: Locator;
    readonly signInButton: Locator;

    constructor(private readonly page: Page) {
        this.emailTextbox = page.getByRole('textbox', { name: 'Email' });
        this.passwordTextbox = page.getByRole('textbox', { name: 'Password' });
        this.signInButton = page.getByRole('button', { name: 'Sign in' });
    }

    async navigate() {
        await this.page.goto('/login');
    }

    async login(email: string, password: string) {
        await this.emailTextbox.fill(email);
        await this.passwordTextbox.fill(password);
        await this.signInButton.click();
    }
}
