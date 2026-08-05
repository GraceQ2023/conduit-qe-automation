
// Types for article API requests and responses, including creating an article and the expected response structure, helping to ensure type safety and clarity when interacting with the article-related endpoints of the API.
// for example, when creating a new article, the request must include a title, description, body, and a list of tags, and the response will contain the article's slug, title, description, and body.
// if don't have this type, we will have to use any type for the request and response, which is not ideal for type safety and code clarity.
export interface CreateArticleRequest {
    title: string;
    description: string;
    body: string;
    tagList: string[];
}

export interface CreateArticleResponse {
    article: {
        slug: string;
        title: string;
        description: string;
        body: string;
        author: {username: string};
    };
}

