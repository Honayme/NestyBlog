import {ApiModelProperty} from '@nestjs/swagger';

export class CommentDto {
    @ApiModelProperty()
    id: number;

    @ApiModelProperty()
    readonly content: string;

    @ApiModelProperty()
    userId: any;

    @ApiModelProperty()
    articleId: any;
}
