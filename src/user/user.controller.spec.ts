    describe('showUserById()', () => {
        it('should return a users with the given id', async () => {
            const user = {
                id: 2,
                email: 'honayme@gmail.com',
                password: 'clearpassword',
                firstname: 'thomas',
                name: 'mirabile',
                avatar: 'unAvatar',
                role: 'standard',
                createdAt: '2019-02-07T14:19:00.283Z',
                updatedAt: '2019-02-07T14:19:00.283Z',
            };

            // Inject la valeur user dans le retour du service
            userService.showOne = jest.fn().mockResolvedValue(user);

            const result = await userController.showUserById(2);
            // Test le retour du service à l'appel du controlleur
            expect(await userController.showUserById(2)).toBe(result);
        });
    });
    describe('updateUser()', () => {
        it('should return a users who just have been updated', async () => {
            const user: UserDto = {
                id: 2,
                email: 'honayme@gmail.com',
                password: 'clearpassword',
                firstname: 'thomas',
                name: 'mirabile',
                avatar: 'unAvatar',
                role: UserRole.Standard,
            };

            const userUpdated: UserDto = {
                id: 2,
                email: 'honayme@gmail.com',
                password: 'clearpassword',
                firstname: 'updatedFirstname',
                name: 'updatedName',
                avatar: 'unAvatar',
                role: UserRole.Standard,
            };

            const updatedData = {
                firstname: 'updatedFirstname',
                name: 'updatedName',
            };
            // Inject la valeur user dans le retour du service
            userService.update = jest.fn().mockResolvedValue(user);

            const result = await userController.updateUser(2, updatedData);
            // Test le retour du service à l'appel du controlleur
            expect(await userController.updateUser(2, updatedData)).toBe(result);
        });
    });
