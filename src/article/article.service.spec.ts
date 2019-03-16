    it('should call showOne method with expected param', async () => {
        const findOneArticleSpy = jest.spyOn(articleService, 'showOne');
        const showOneOptions = 2;
        articleService.showOne(showOneOptions);
        expect(findOneArticleSpy).toHaveBeenCalledWith(showOneOptions);
    });
