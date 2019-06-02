import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class HttpService {

    constructor(private _http: HttpClient) {}

    public get(url: string, params?): Observable<any> {
        return this._http.get(url, {
            params: params
        });
    }

    public post(url: string, payload?: any, params?): Observable<any> {
        return this._http.post(url, payload, {
            params: params
        });
    }
}
