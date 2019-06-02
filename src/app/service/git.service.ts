import { Injectable } from "@angular/core";
import { HttpService } from './http.service';

@Injectable()
export class GitService {
    constructor(private _httpService: HttpService) {}

    public getRepos(searchText: string, starOption: string = 'any', range1?, range2?, isForked = false, license?: string) {
        let searchString = "";
        const url = 'https://api.github.com/search/repositories';
        for (const s of searchText.split(',')) searchString += s + '+';
        searchString = searchString.substring(0, searchString.length - 1);  // chop off the last '+'

        
        if (starOption && starOption.toLowerCase() !== 'any') {
            let starsQ;  // the star query parameter to be built
            if (starOption.toLowerCase() === 'between') {
                starsQ = `stars:${range1}..${range2}`;
            } else if (starOption.toLowerCase() === '=') {
                starsQ = `stars:${range1}`;
            } else {
                starsQ = `stars:${starOption}${range1}`;
            }
            searchString += `+${starsQ}`;
        }
        if (license && license.toLowerCase() !== 'default') {
            searchString += `+license:${license}`;
        }
        searchString += `+fork:${isForked}`;
        
        const params = {
            q: searchString,  // the q query parameter
        }
        return this._httpService.get(url, params);
    }
}