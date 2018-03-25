import { BaseEntity } from './../../shared';

export class Test1 implements BaseEntity {
    constructor(
        public id?: string,
        public column1?: string,
    ) {
    }
}
