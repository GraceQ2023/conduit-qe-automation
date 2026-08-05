import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { CreateArticleRequest } from '../types/article';

export class ArticleApi {

    constructor(
        private readonly request: APIRequestContext) {}

    async createArticle(requestBody: CreateArticleRequest): Promise<APIResponse> {

        return this.request.post(
            `${process.env.API_URL}articles`,
            {
                data: {
                    article: requestBody,
                },
            },
        );
    }
}