import {json} from 'web-request';
import {settings} from '../settings/settings.interface';

export function fetchEvents(settings: settings): any {
	return json(`${settings.cfInstance}/v2/events`, {
		headers: {
			Authorization: `${settings.token.token_type} ${settings.token.access_token}`
		},
		strictSSL: false,
		throwResponseError: true,
		json: true,
		qs: {
			'results-per-page': 20,
			'order-direction': 'desc'
		}
	});
}
