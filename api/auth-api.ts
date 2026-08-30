import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { LoginRequest} from '../types/auth';


// API client/helper communcatte with authentication endpoints

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

    // Additional methods for registration, logout can be added here later on


}