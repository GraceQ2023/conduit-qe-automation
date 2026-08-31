import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { CreateArticleRequest, UpdateArticleRequest } from '../types/article';


// Handles article CRUD API calls, use authenticated request context - authenticatedRequest fixture

export class ArticleApi {

    constructor(
        private readonly request: APIRequestContext) {}

    
    async getArticle(slug: string): Promise<APIResponse> {
        return this.request.get(
            `${process.env.API_URL}articles/${slug}`
        );
    }

    async createArticle(requestBody: CreateArticleRequest): Promise<APIResponse> {
        return this.request.post(
            `${process.env.API_URL}articles`,
            { data: { article: requestBody } },
        );
    }

    async updateArticle(slug: string, requestBody: UpdateArticleRequest): Promise<APIResponse> {
        return this.request.put(
            `${process.env.API_URL}articles/${slug}`,
            { data: { article: requestBody } },
        );
    }

    async deleteArticle(slug: string): Promise<APIResponse> {
        return this.request.delete(
            `${process.env.API_URL}articles/${slug}`,
        );
    }
}