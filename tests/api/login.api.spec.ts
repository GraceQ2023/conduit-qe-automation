import { AuthApi } from '../../api/auth-api';
import { test, expect } from '../../fixtures/test.fixture';
import type { LoginResponse, AuthErrorResponse } from '../../types/auth';


test.describe('Login API', () => {

    let authApi: AuthApi;

    test.beforeEach(async ({request}) => {
        authApi = new AuthApi(request);
    });

    test('user can log in with valid credentials', { tag: '@smoke' }, async () => {

        const response = await authApi.login({
            email: process.env.TEST_EMAIL!,
            password: process.env.TEST_PASSWORD!,
        });

        expect(response.status()).toBe(200);

        const body = await response.json() as LoginResponse;

        expect(body.user.token).toBeTruthy();
        expect(body.user.email).toBe(process.env.TEST_EMAIL!);
        expect(body.user.username).toBe(process.env.TEST_USERNAME!);
    });

    
    test ('user cannot log in with invalid credentials', async () => {

        const response = await authApi.login({
            email: process.env.TEST_EMAIL!,
            password: 'incorrectpassword',
        });

        expect(response.status()).toBe(403);

        const body = await response.json() as AuthErrorResponse;

        expect(body.errors["email or password"]).toContain("is invalid");
    });

});