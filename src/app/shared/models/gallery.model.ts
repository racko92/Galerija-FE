export class Gallery {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public pictures?: string[],
        public user?: any[],
        public user_id?: number,
    ){}
}