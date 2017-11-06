import { BaseEntity } from './../../shared';

export class CartMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public customerId?: number,
        public productId?: number,
        public quantity?: number,
        public productName?: string,
        public productPrice?: number,
    ) {
    }
}
