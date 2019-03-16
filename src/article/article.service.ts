    async showOne(@Param('id') id: number) {
        return await this.articleRepository.findOne({where: {id}});
    }
