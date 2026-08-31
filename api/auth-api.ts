import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { LoginRequest} from '../types/auth';


// Handles auth API calls, currently just login, will add registration/logout later
// Use default `request` fixture - an unauthenticated request context

export class AuthApi {

    constructor(private readonly request: APIRequestContext) {}

    async login(requestBody: LoginRequest): Promise<APIResponse> {
        return this.request.post(
            `${process.env.API_URL}users/login`, 
            {
                data: {user: requestBody},
            },
        );
    }   


}