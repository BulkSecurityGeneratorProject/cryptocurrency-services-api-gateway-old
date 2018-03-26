import { BaseEntity } from './../../shared';

export class MasternodesOnlineSupplement implements BaseEntity {
    constructor(
        public id?: string,
        public coin?: string,
        public price?: string,
        public change?: string,
        public volume?: string,
        public marketcap?: string,
        public roiNodes?: string,
        public numberRequired?: string,
        public minimumWorth?: string,
        public githubPage?: string,
        public githubCommits?: number,
        public githubFirstCommit?: any,
        public githubLastCommit?: any,
        public notes?: string,
    ) {
    }
}
