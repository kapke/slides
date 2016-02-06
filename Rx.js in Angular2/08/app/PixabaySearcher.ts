import {Inject, Injectable} from "angular2/core";
import {Jsonp, URLSearchParams} from 'angular2/http';
import {Observable} from "rxjs/Observable";

import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/distinctUntilChanged";

interface PixabayResponse {
    hits: PixabayImage[];
}

export interface PixabayImage {
    id: number;
    previewURL: string;
    webformatURL: string;
    tags: string;
}

@Injectable()
export class PixabaySearcher {
    constructor (@Inject('PIXABAY_API_KEY') private API_KEY: string, private jsonp: Jsonp) {}

    public search (query: Observable<string>) {
        return query
            .debounceTime(400)
            .distinctUntilChanged()
            .switchMap(this.findImages.bind(this));
    }

    public findImages (query: string): Observable<Array<PixabayImage>> {
        const search = new URLSearchParams();
        search.append('key', 'aaa');
        search.append('q', encodeURIComponent(query));
        return this.jsonp.get(`https://pixabay.com/api?callback=JSONP_CALLBACK`, {search})
            .map(res => res.json())
            .map((res:PixabayResponse) => res.hits);
    }
}
