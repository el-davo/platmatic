import {post, put} from 'request';
import {json} from 'web-request';
import {Instance} from "../../settings/settings.state";

export function checkRouteExists(instance: Instance, domain_guid: string, host: string) {
	return json(`${instance.cfInstance}/v2/routes/reserved/domain/${domain_guid}?host=${host}`, {
		headers: {
			Authorization: `${instance.token.token_type} ${instance.token.access_token}`
		},
		throwResponseError: true,
		strictSSL: false,
		qs: {
			host
		},
	});
}

export function createRoute(instance: Instance, domain_guid, space_guid, host) {
	return new Promise((resolve, reject) => {
		post(`${instance.cfInstance}/v2/routes`, {
			headers: {
				Authorization: `${instance.token.token_type} ${instance.token.access_token}`,
				Accept: "application/json"
			},
			rejectUnauthorized: false,
			form: JSON.stringify({domain_guid, space_guid, host})
		}, (err, response, data) => {
			err ? reject(err) : resolve(JSON.parse(data));
		});
	});
}

export function associateAppWithRoute(instance: Instance, guid, app_guid) {
	return new Promise((resolve, reject) => {
		put(`${instance.cfInstance}/v2/routes/${guid}/apps/${app_guid}`, {
			headers: {
				Authorization: `${instance.token.token_type} ${instance.token.access_token}`,
				Accept: "application/json"
			},
			rejectUnauthorized: false
		}, (err, response, data) => {
			err ? reject(err) : null;

			response.statusCode === 201 ? resolve() : reject();
		});
	});
}
