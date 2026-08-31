// Define the expected login API request and response shapes instead of using `any`

export interface LoginRequest{
    email: string;
    password: string;
}

export interface LoginResponse {
    user: {
        email: string;
        username: string;
        bio: string | null;
        image: string | null;
        token: string; // JWT used in `Authorization: Token <token>` headers
    };
}

export interface AuthErrorResponse {
  errors: {
    "email or password": string[];
  };
}

// other auth interfaces like registration, logout, tokens, refresh tokens etc. can be added here when needed