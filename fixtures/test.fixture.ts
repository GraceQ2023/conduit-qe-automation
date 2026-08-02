import { test as base, request as baseRequest, type APIRequestContext } from '@playwright/test';
import { AuthApi } from '../api/auth-api';
import { LoginResponse } from '../types/auth';
import {LoginPage} from '../pages/login-page';
import { HeaderComponent } from '../components/header-component';
import { HomePage } from '../pages/home-page';
//import { ArticleApi } from '../api/article-api';

type TestFixtures = {
    
    homePage: HomePage;
    header: HeaderComponent;
    loginPage: LoginPage;
    authenticatedRequest: APIRequestContext;

  // articleApi: ArticleApi;
};

export const test = base.extend<TestFixtures>({

    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    header: async ({ page }, use) => {
        await use(new HeaderComponent(page));
    },

    // Fixture to provide an authenticated API request context for tests that require authentication
    authenticatedRequest: async ({request}, use) => {
        const authApi = new AuthApi(request);

        const loginResponse = await authApi.login({
            email: process.env.TEST_EMAIL!,
            password: process.env.TEST_PASSWORD!,     
        });

    if (loginResponse.status() !== 200) {
        throw new Error(`Authentication setup failed with status` + 
            `${loginResponse.status()} : ${await loginResponse.text()}`);
    }

    const body = await loginResponse.json() as LoginResponse;

    const apiContext = await baseRequest.newContext({
        baseURL: process.env.API_URL,
        extraHTTPHeaders: {
            'Authorization': `Token ${body.user.token}`,
            Accept: 'application/json',
        },
    });

    await use(apiContext);
    await apiContext.dispose();
    },
    
});

// Re-export everything from the base test module
export { expect } from '@playwright/test';