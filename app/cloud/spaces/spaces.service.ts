import {json} from 'web-request';
import {settings} from '../settings/settings.interface';

export function fetchSpacesInOrganization(settings: settings, organization_guid) {
	return json(`${settings.cfInstance}/v2/organizations/${organization_guid}/summary`, {
		headers: {
			Authorization: `${settings.token.token_type} ${settings.token.access_token}`,
			Accept: "application/json"
		},
		strictSSL: false,
		throwResponseError: true
	});
}

export function getAppsInSpace(settings: settings, space_guid, filter) {
	return json(`${settings.cfInstance}/v2/spaces/${space_guid}/apps`, {
		headers: {
			Authorization: `${settings.token.token_type} ${settings.token.access_token}`,
			Accept: "application/json"
		},
		strictSSL: false,
		throwResponseError: true,
		qs: {
			q: filter
		}
	});
}

export function fetchAllSpaces(settings: settings) {
	return json(`${settings.cfInstance}/v2/spaces`, {
		headers: {
			Authorization: `${settings.token.token_type} ${settings.token.access_token}`,
			Accept: "application/json"
		},
		strictSSL: false,
		throwResponseError: true
	});
}
