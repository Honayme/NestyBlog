import {UserRole} from '../enums/userRole.enum';
import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';

export class UserDto {
    @ApiModelPropertyOptional({ example: 1 })
    id: number;

    @ApiModelPropertyOptional({ example: 'jDoe@mail.com' })
    readonly email: string;

    @ApiModelPropertyOptional({ example: 'Dragon1234Password' })
    password: string;

    @ApiModelPropertyOptional({ example: 'John' })
    readonly firstname: string;

    @ApiModelPropertyOptional({ example: 'Doe' })
    readonly name: string;

    @ApiModelProperty()
    readonly avatar: ArrayBuffer;

    @ApiModelPropertyOptional({ example: 'standard' })
    role: UserRole;
}
