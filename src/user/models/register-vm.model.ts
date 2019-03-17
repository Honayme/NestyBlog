import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { LoginVm } from './login-vm.model';
import {UserRole} from './userRole.enum';

export class RegisterVm extends LoginVm {
    @ApiModelPropertyOptional({ example: 'John' })
    firstname?: string;

    @ApiModelPropertyOptional({ example: 'Doe' })
    name?: string;

    @ApiModelPropertyOptional({ example: 'author' })
    role?: UserRole;
}
