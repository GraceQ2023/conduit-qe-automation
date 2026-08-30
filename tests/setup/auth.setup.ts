import { test as setup, expect } from '../../fixtures/test.fixture';
import { AuthApi } from '../../api/auth-api';
import type { LoginResponse } from '../../types/auth';



// Setup test to authenticate user and store authentication state for subsequent tests  

const authFile = '.auth/user.json';

setup('authenticate user', async ({ request, page, header }) => {
    const authApi = new AuthApi(request);

    const response = await authApi.login({
        email: process.env.TEST_EMAIL!,
        password: process.env.TEST_PASSWORD!,
    });

    expect(response.ok()).toBeTruthy();

    const body = (await response.json()) as LoginResponse;
    const token = body.user.token;

    await page.goto('/');

    await page.evaluate((jwtToken) => {
        localStorage.setItem('jwtToken', jwtToken);
    }, token);

    await page.reload();

    await expect(header.newArticleLink).toBeVisible();

    await expect(
        header.profileLink(process.env.TEST_USERNAME!)
    ).toBeVisible();

    await page.context().storageState({
        path: authFile,
    });
});