export class Comment {
    public id?: number;
    public body?: string;
    public comment_id?: number;
    public user_id?: number;
    public user: any;

    constructor(comment){
        Object.assign(this, comment);
    }
}