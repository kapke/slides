import {Component} from "angular2/core";
import {PixabayImage} from "../../PixabaySearcher";

@Component({
    inputs: ['image'],
    selector: 'my-image',
    template: `
        <div>
            <img [src]="image.previewURL" />
            <span>{{ image.tags }}</span>
        </div>
    `
})
export class Image {
    public image: PixabayImage = {
        id: 0,
        previewURL: '',
        webformatURL: '',
        tags: ''
    };
}
