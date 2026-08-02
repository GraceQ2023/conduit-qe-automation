import { test as base, request as baseRequest, type APIRequestContext } from '@playwright/test';
import { AuthApi } from '../api/auth-api';
import { LoginResponse } from '../types/auth';
import {LoginPage} from '../pages/login-page';
//import { ArticleApi } from '../api/article-api';

type TestFixtures = {
    authenticatedRequest: APIRequestContext;
    loginPage: LoginPage;

  // articleApi: ArticleApi;
};

export const test = base.extend<TestFixtures>({

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

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    
});

// Re-export everything from the base test module
export { expect } from '@playwright/test';