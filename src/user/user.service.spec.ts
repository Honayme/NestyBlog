    it('should call showOne method with expected param', async () => {
        const findOneUserSpy = jest.spyOn(userService, 'showOne');
        const showOneOptions = 2;
        userService.showOne(showOneOptions);
        expect(findOneUserSpy).toHaveBeenCalledWith(showOneOptions);
    });
    it('should call updateUser method with expected params', async () => {
        const updateUserSpy = jest.spyOn(userService, 'update');
        const userId = 2;
        const dto = new UserDto();
        userService.update(userId, dto);
        expect(updateUserSpy).toHaveBeenCalledWith(userId, dto);
    });
