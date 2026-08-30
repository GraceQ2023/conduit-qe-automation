// Interface for login request payload, i.e., the data sent to the login API

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
        token: string;
    };
}

export interface AuthErrorResponse {
  errors: {
    "email or password": string[];
  };
}

// Additional auth interfaces like registration, logout, tokens, refresh tokens, roles etc. can be added here when needed