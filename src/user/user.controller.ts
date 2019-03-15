    @Get(':id')
    @ApiOperation({title: 'Get a user by the given id'})
    @ApiResponse({ status: 200, description: 'User Found.'})
    @ApiResponse({ status: 404, description: 'No User found.'})
    @UseGuards(AuthGuard('jwt'))
    showUserById(@CurrentUser('id') userId: number, @Param('id') id: number) {
        if (userId) {
            id = userId;
        }

        return this.userService.showOne(id);
    }
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
