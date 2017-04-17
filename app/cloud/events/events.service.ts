import {json} from 'web-request';
import {Instance} from "../../settings/settings.state";

export function fetchEvents(instance: Instance): any {
	return json(`${instance.cfInstance}/v2/events`, {
		headers: {
			Authorization: `${instance.token.token_type} ${instance.token.access_token}`
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
