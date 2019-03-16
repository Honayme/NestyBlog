    @Get(':id')
    @ApiOperation({title: 'Get a specific article with the given id'})
    @ApiResponse({ status: 200, description: 'Article Found.'})
    @ApiResponse({ status: 404, description: 'No Article found.'})
    showArticleById(@Param('id') id: number) {
        return this.articleService.showOne(id);
    }
