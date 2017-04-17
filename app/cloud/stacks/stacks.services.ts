import {json} from 'web-request';
import {Instance} from "../../settings/settings.state";

export function fetchStacks(instance: Instance) {
	return json(`${instance.cfInstance}/v2/stacks`, {
		headers: {
			Authorization: `${instance.token.token_type} ${instance.token.access_token}`
		},
		throwResponseError: true,
		strictSSL: false
	});
}
