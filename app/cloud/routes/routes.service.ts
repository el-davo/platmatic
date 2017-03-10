import {post, put} from 'request';
import {json} from 'web-request';
import {settings} from '../settings/settings.interface';

export function checkRouteExists(settings: settings, domain_guid: string, host: string) {
	return json(`${settings.cfInstance}/v2/routes/reserved/domain/${domain_guid}?host=${host}`, {
		headers: {
			Authorization: `${settings.token.token_type} ${settings.token.access_token}`
		},
		throwResponseError: true,
		strictSSL: false,
		qs: {
			host
		},
	});
}

export function createRoute(settings, domain_guid, space_guid, host) {
	return new Promise((resolve, reject) => {
		post(`${settings.cfInstance}/v2/routes`, {
			headers: {
				Authorization: `${settings.token.token_type} ${settings.token.access_token}`,
				Accept: "application/json"
			},
			rejectUnauthorized: false,
			form: JSON.stringify({domain_guid, space_guid, host})
		}, (err, response, data) => {
			err ? reject(err) : resolve(JSON.parse(data));
		});
	});
}

export function associateAppWithRoute(settings: settings, guid, app_guid) {
	return new Promise((resolve, reject) => {
		put(`${settings.cfInstance}/v2/routes/${guid}/apps/${app_guid}`, {
			headers: {
				Authorization: `${settings.token.token_type} ${settings.token.access_token}`,
				Accept: "application/json"
			},
			rejectUnauthorized: false
		}, (err, response, data) => {
			err ? reject(err) : null;

			response.statusCode === 201 ? resolve() : reject();
		});
	});
}
