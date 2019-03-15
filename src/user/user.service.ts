    async showOne(@Param('id') id: number) {
        return await this.userRepository.findOne({where: {id}});
    }

    async update(@Param('id') id: number,  data: Partial<UserDto>) {
        await this.userRepository.update({id}, data);
        return await this.userRepository.findOne({id});
    }

