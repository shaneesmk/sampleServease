import { BaseEntity } from './../../shared';

export class ProductMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public brand?: string,
        public imageContentType?: string,
        public image?: any,
        public quantity?: number,
        public price?: number,
    ) {
    }
}
