
// unique suffix per call so parallel tests don't collide on the same article title/slug

const getUniqueId = () =>
    `${Date.now().toString().slice(-4)}${Math.floor(Math.random() * 100)}`;


export const ArticleTestData = {

    createArticle: () => ({
        title: `Playwright Test Article 2026 ${getUniqueId()}`,
        description: 'Article created by Playwright 2026',
        body: 'This is the original article body 2026.',
        tagList: ['playwright', 'automation', 'QA'],
    }),


    updateArticle: () => ({
        title: `Updated Playwright Test Article 2026 ${getUniqueId()}`,
        description: 'Updated article description 2026',
        body: 'This is the updated article body 2026.',
    }),
};