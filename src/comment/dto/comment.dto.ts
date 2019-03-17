import {ApiModelProperty} from '@nestjs/swagger';

export class CommentDto {
    @ApiModelProperty()
    id: number;

    @ApiModelProperty()
    readonly content: string;

    //Don't understand why but if i pass a specific type on this, relation fail, and userId isn't registered
    @ApiModelProperty()
    user: any;

    @ApiModelProperty()
    article: any;
}
