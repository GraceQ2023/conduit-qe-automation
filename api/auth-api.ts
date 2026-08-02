import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { LoginRequest} from '../types/auth';


// AuthApi class that provides methods to interact with the authentication API endpoints

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