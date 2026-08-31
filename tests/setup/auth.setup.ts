import { test as setup, expect } from '../../fixtures/test.fixture';
import { AuthApi } from '../../api/auth-api';
import type { LoginResponse } from '../../types/auth';


// runs once before authenticated UI tests
// saves the authenticated browser state to .auth/user.json so tests skip the login flow

const authFile = '.auth/user.json';

setup('authenticate user', async ({ request, page, header }) => {

    // Login via API so UI tests don't depend on login page
    const authApi = new AuthApi(request);

    const response = await authApi.login({
        email: process.env.TEST_EMAIL!,
        password: process.env.TEST_PASSWORD!,
    });

    expect(response.ok()).toBeTruthy();

    const body = (await response.json()) as LoginResponse;
    const token = body.user.token;

    await page.goto('/');

    // the app stores JWT in localStorage, then set it directly to create the logged-in state
    await page.evaluate((jwtToken) => {
        localStorage.setItem('jwtToken', jwtToken);
    }, token);

    await page.reload(); // reload so app picks up the token

    // check authentication worked before saving the state
    await expect(header.newArticleLink).toBeVisible();

    await expect(
        header.profileLink(process.env.TEST_USERNAME!)
    ).toBeVisible();

    await page.context().storageState({
        path: authFile,
    });
});