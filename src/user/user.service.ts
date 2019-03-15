    async update(@Param('id') id: number,  data: Partial<UserDto>) {
        await this.userRepository.update({id}, data);
        return await this.userRepository.findOne({id});
    }

