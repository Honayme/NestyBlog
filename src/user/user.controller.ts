    @Put(':id')
    @ApiOperation({title: 'Update an existing user with the given id'})
    @ApiResponse({ status: 200, description: 'The user has been updated'})
    @ApiResponse({ status: 400, description: 'The user hasn\'t been updated'})
    @ApiResponse({ status: 404, description: 'No Users found.'})
    updateUser(@CurrentUser('id') userId: number, @Param('id') id: number, @Body() data: Partial<UserDto>) {
        if (userId) {
            id = userId;
        }

        return this.userService.update(id, data);
    }
