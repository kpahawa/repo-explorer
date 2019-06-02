import { License } from './license';

export class Repo {
    name: string;
    url: string;
    id: number;
    stars: number;
    owner: string;
    forks: number;
    license: License;
    licenseURL: string;
    fork: boolean;
}
