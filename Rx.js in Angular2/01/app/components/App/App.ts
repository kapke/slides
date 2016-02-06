import {COMMON_DIRECTIVES} from "angular2/common";
import {Component, View} from 'angular2/core';
import {PixabaySearcher, PixabayImage} from "../../PixabaySearcher";
import {Image} from "../Image/Image";

@Component({
    selector: 'my-app',
    templateUrl: 'app/components/App/my-app.html',
    directives: [Image, COMMON_DIRECTIVES]
})
export default class App {
    public images:PixabayImage[] = [];

    constructor (private imageSearcher: PixabaySearcher) {}

    onQueryChange (newQuery: string) {
        this.imageSearcher.findImages(newQuery)
            .subscribe((images) => {
                this.images = images
            });
    }
}
