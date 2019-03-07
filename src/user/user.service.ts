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
