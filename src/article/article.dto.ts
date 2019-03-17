import {ApiModelProperty} from '@nestjs/swagger';

export class ArticleDto {
    @ApiModelProperty()
    id: number;

    @ApiModelProperty()
    readonly title: string;

    @ApiModelProperty()
    readonly content: string;

    @ApiModelProperty()
    readonly like: number;

    @ApiModelProperty()
    readonly dislike: number;

    @ApiModelProperty()
    user: number;
}
