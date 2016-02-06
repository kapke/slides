import {COMMON_DIRECTIVES, Control} from "angular2/common";
import {Component, View} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {PixabaySearcher, PixabayImage} from "../../PixabaySearcher";
import {Image} from "../Image/Image";

@Component({
    selector: 'my-app',
    templateUrl: 'app/components/App/my-app.html',
    directives: [Image, COMMON_DIRECTIVES]
})
export default class App {
    public images:Observable<PixabayImage>;
    public query = new Control();

    constructor (private imageSearcher: PixabaySearcher) {
        this.images = this.imageSearcher.search(this.query.valueChanges);
    }
}
