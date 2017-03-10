import {json} from 'web-request';
import {settings} from '../settings/settings.interface';

export function fetchServiceInstancesInSpaceById(settings: settings, spaceGuid: string, page = 1) {
	return json(`${settings.cfInstance}/v2/spaces/${spaceGuid}/service_instances`, {
		headers: {
			Authorization: `${settings.token.token_type} ${settings.token.access_token}`
		},
		throwResponseError: true,
		strictSSL: false,
		qs: {
			page,
			'inline-relations-depth': 2
		},
	});
}

export function fetchServiceInstanceById(settings: settings, guid: string) {
	return json(`${settings.cfInstance}/v2/services/${guid}`, {
		headers: {
			Authorization: `${settings.token.token_type} ${settings.token.access_token}`
		},
		throwResponseError: true,
		strictSSL: false
	});
}
