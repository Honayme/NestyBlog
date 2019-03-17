import { ApiModelProperty } from '@nestjs/swagger';

export class LoginResponseVm {
    @ApiModelProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInJvbGUiOiJhdXRob3IiLCJpYXQiOjE1NTI0MDkyNzgsImV4cCI6MTU1MjQ1MjQ3OH0.oK-iHDyScNMAvX4xGcd7MH3xt7BUIBI4zfNhnl5B6Mk' })
    token: string;
}
