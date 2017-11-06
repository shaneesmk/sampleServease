import { BaseEntity } from './../../shared';

export class SaleMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public customerName?: string,
        public totalCash?: number,
        public paymentType?: string,
    ) {
    }
}
