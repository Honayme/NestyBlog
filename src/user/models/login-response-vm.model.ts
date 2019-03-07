import { ApiModelProperty } from '@nestjs/swagger';

export class LoginResponseVm {
    @ApiModelProperty() token: string;
}
