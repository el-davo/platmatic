import {jsdom} from 'jsdom';
const doc = jsdom('<!doctype html><html><body></body></html>');
import * as injectTapEventPlugin from 'react-tap-event-plugin';

declare const global: any;

injectTapEventPlugin();

global.document = doc;
global.window = doc.defaultView;
global.navigator = {
	userAgent: 'node.js',
	plugins: []
};
