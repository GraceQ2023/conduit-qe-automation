import{Locator, Page} from "@playwright/test";

export class HeaderComponent {

    private readonly header: Locator;

    readonly homeLink: Locator;
    readonly signInLink: Locator;
    readonly signUpLink: Locator;
    readonly newArticleLink: Locator;
    readonly settingsLink: Locator;

    constructor(page: Page) {
        this.header = page.locator('app-layout-header');

        this.homeLink = this.header.getByRole('link', { name: 'Home', exact: true });
        this.signInLink = this.header.getByRole('link', { name: 'Sign in', exact: true });
        this.signUpLink = this.header.getByRole('link', { name: 'Sign up', exact: true });
        this.newArticleLink = this.header.getByRole('link', { name: /New Article/ });
        this.settingsLink = this.header.getByRole('link', { name: /Settings/ });
    }

    // get profile link based on provided username as it is dynamic and changes based on the logged-in user
    profileLink(username: string): Locator {
        return this.header.getByRole('link', { name: username, exact: true });
    }

}