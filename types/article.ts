
// Define the expected article API request and response shapes instead of using `any`

export interface CreateArticleRequest {
    title: string;
    description: string;
    body: string;
    tagList?: string[];
}

export interface UpdateArticleRequest {
    title?: string;
    description?: string;
    body?: string;
    tagList?: string[];
}

export interface ArticleResponse {
    article: {
        slug: string; 
        title: string;
        description: string;
        body: string;
        author: {
            username: string;
        };
    };
}




