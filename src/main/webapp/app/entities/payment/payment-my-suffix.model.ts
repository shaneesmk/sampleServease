import { BaseEntity } from './../../shared';

export class PaymentMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public type?: string,
    ) {
    }
}
