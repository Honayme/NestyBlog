    @Post('register')
    @ApiCreatedResponse({ type: User })
    async register(@Body() registerVm: RegisterVm): Promise<User> {
        const { email, password } = registerVm;

        if (!email) {
            throw new HttpException('Username is required', HttpStatus.BAD_REQUEST);
        }

        if (!password) {
            throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
        }

        let exist;
        try {
            exist = await this.userRepository.findOne({where: {email}});
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (exist) {
            throw new HttpException(`${email} exists`, HttpStatus.BAD_REQUEST);
        }

        return await this.userService.register(registerVm);
    }
    @Post('login')
    @ApiCreatedResponse({ type: LoginResponseVm })
    async login(@Body() loginVm: LoginVm): Promise<LoginResponseVm> {
        const fields = Object.keys(loginVm);
        fields.forEach(field => {
            if (!loginVm[field]) {
                throw new HttpException(`${field} is required`, HttpStatus.BAD_REQUEST);
            }
        });

        return this.userService.login(loginVm);
    }
