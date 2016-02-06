import {provide} from "angular2/core";
import {bootstrap} from 'angular2/bootstrap';
import {HTTP_PROVIDERS, JSONP_PROVIDERS} from 'angular2/http';

import App from './components/App/App';
import {PixabaySearcher} from "./PixabaySearcher";

const PIXABAY_API_KEY = '2014944-68ae22df387d1bd06d49a4457';

bootstrap(App, [
    HTTP_PROVIDERS,
    JSONP_PROVIDERS,
    provide('PIXABAY_API_KEY', {useValue: PIXABAY_API_KEY}),
    PixabaySearcher
]);
