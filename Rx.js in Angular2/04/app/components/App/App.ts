import {COMMON_DIRECTIVES, Control} from "angular2/common";
import {Component, View} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {PixabaySearcher, PixabayImage} from "../../PixabaySearcher";
import {Image} from "../Image/Image";

import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/switchMap";

@Component({
    selector: 'my-app',
    templateUrl: 'app/components/App/my-app.html',
    directives: [Image, COMMON_DIRECTIVES]
})
export default class App {
    public images:Observable<PixabayImage>;
    public query = new Control();

    constructor (private imageSearcher: PixabaySearcher) {
        this.images = this.query.valueChanges
            .debounceTime(400)
            .switchMap(this.queryImages.bind(this));
    }

    queryImages (newQuery: string) {
        return this.imageSearcher.findImages(newQuery);
    }
}
