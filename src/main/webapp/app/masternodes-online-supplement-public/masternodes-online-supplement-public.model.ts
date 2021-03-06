import { BaseEntity } from '../shared/index';

export class MasternodesOnlineSupplementPublic implements BaseEntity {
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
        public projectOrigin?: string,
        public masternodesOnlineUrl?: string,
        public githubUrl?: string,
        public githubCommits?: number,
        public githubFirstCommit?: any,
        public githubLastCommit?: any,
        public notes?: string,
    ) {
    }
}
