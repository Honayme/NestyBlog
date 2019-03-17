import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';

export class LoginVm {
    @ApiModelProperty({ required: true, format: 'email', example: 'jDoe@mail.com' })
    email: string;

    @ApiModelProperty({ required: true, minLength: 6, type: String, format: 'password', example: 'Dragon1234Password' })
    password: string;
}
