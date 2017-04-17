import {json} from 'web-request';
import {Instance} from "../../settings/settings.state";

export function fetchSpacesInOrganization(instance: Instance, organization_guid) {
	return json(`${instance.cfInstance}/v2/organizations/${organization_guid}/summary`, {
		headers: {
			Authorization: `${instance.token.token_type} ${instance.token.access_token}`,
			Accept: "application/json"
		},
		strictSSL: false,
		throwResponseError: true
	});
}

export function getAppsInSpace(instance: Instance, space_guid, filter) {
	return json(`${instance.cfInstance}/v2/spaces/${space_guid}/apps`, {
		headers: {
			Authorization: `${instance.token.token_type} ${instance.token.access_token}`,
			Accept: "application/json"
		},
		strictSSL: false,
		throwResponseError: true,
		qs: {
			q: filter
		}
	});
}

export function fetchAllSpaces(instance: Instance) {
	return json(`${instance.cfInstance}/v2/spaces`, {
		headers: {
			Authorization: `${instance.token.token_type} ${instance.token.access_token}`,
			Accept: "application/json"
		},
		strictSSL: false,
		throwResponseError: true
	});
}
