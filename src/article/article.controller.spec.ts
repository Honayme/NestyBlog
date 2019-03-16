    describe('showArticleById()', () => {
        it('should return a articles with the given id', async () => {
            const article = {
                id: 2,
                content: 'Great article come with great responsability',
                userId: 2,
            };

            // Inject la valeur article dans le retour du service
            articleService.showOne = jest.fn().mockResolvedValue(article);

            const result = await articleController.showArticleById(2);
            // Test le retour du service à l'appel du controlleur
            expect(await articleController.showArticleById(2)).toBe(result);
        });
    });
