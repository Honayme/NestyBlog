    async login(loginVm: LoginVm) {
        const {email, password} = loginVm;

        const user = await this.userRepository.findOne({where: {email}});

        if (!user) {
            throw new HttpException('Invalid crendentials', HttpStatus.NOT_FOUND);
        }

        // const isMatch = await compare(password, user.password);
        //
        // if (!isMatch) {
        //     throw new HttpException('Invalid crendentials', HttpStatus.BAD_REQUEST);
        // }

        const payload: JwtPayload = {
            id: user.id,
            role: user.role,
        };

        const token = await this.authService.signPayload(payload);

        return {
            token,
            user,
        };
    }

    async register(registerVm: RegisterVm): Promise<User> {
        const {email, password, firstname, name, role} = registerVm;

        const newUser = new User();
        newUser.email = email;
        newUser.firstname = firstname;
        newUser.name = name;
        newUser.role = role;

        const salt = await genSalt(10);
        newUser.password = await hash(password, salt);

        return await this.create(newUser);
    }
