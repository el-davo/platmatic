import {json} from 'web-request';
import {settings} from '../settings/settings.interface';

export function fetchAllDomains(settings: settings) {
	return json(`${settings.cfInstance}/v2/domains`, {
		headers: {
			Authorization: `${settings.token.token_type} ${settings.token.access_token}`
		},
		throwResponseError: true,
		strictSSL: false
	});
}
