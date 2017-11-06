import { BaseEntity } from './../../shared';

export class CustomerMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public searchKey?: string,
        public name?: string,
        public profilePicContentType?: string,
        public profilePic?: any,
        public phone?: string,
    ) {
    }
}
