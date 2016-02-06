import {COMMON_DIRECTIVES, Control} from "angular2/common";
import {Component, View} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {PixabaySearcher, PixabayImage} from "../../PixabaySearcher";
import {Image} from "../Image/Image";

import "rxjs/add/observable/from";
import "rxjs/add/operator/retryWhen";
import "rxjs/add/operator/delay";
import "rxjs/add/operator/scan";
import "rxjs/add/operator/catch";

@Component({
    selector: 'my-app',
    templateUrl: 'app/components/App/my-app.html',
    directives: [Image, COMMON_DIRECTIVES]
})
export default class App {
    public images:Observable<PixabayImage>;
    public query = new Control();
    public actions = [];


    constructor (private imageSearcher: PixabaySearcher) {
        this.images = this.imageSearcher.search(this.query.valueChanges);

        this.imageSearcher.findImages('cat')
            .retryWhen((errors) => {
                return errors
                    .map(err => {
                        this.actions.push('error');

                        return err;
                    })
                    .scan((errorsCount: number, err) => {
                        if (errorsCount >= 5) {
                            throw err;
                        } else {
                            return errorsCount + 1;
                        }
                    }, 0)
                    .delay(500)
            })
            .catch(_ => Observable.from([]))
            .subscribe(
                () => this.actions.push('success'),
                () => this.actions.push('subscribe-error'),
                () => this.actions.push('complete')
            );
    }
}
