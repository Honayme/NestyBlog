import {ApiModelProperty} from '@nestjs/swagger';

export class CommentDto {
    @ApiModelProperty()
    id: number;

    @ApiModelProperty()
    readonly content: string;

    @ApiModelProperty()
    user: any;

    @ApiModelProperty()
    article: any;
}
