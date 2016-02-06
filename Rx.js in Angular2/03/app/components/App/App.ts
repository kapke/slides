import {COMMON_DIRECTIVES, Control} from "angular2/common";
import {Component, View} from 'angular2/core';
import {PixabaySearcher, PixabayImage} from "../../PixabaySearcher";
import {Image} from "../Image/Image";

import "rxjs/add/operator/debounceTime";

@Component({
    selector: 'my-app',
    templateUrl: 'app/components/App/my-app.html',
    directives: [Image, COMMON_DIRECTIVES]
})
export default class App {
    public images:PixabayImage[] = [];
    public query = new Control();

    constructor (private imageSearcher: PixabaySearcher) {
        this.query.valueChanges
            .debounceTime(400)
            .subscribe(this.queryImages.bind(this));
    }

    queryImages (newQuery: string) {
        this.imageSearcher.findImages(newQuery)
            .subscribe((images) => {
                this.images = images
            });
    }
}
