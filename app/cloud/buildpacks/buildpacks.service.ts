import {json} from 'web-request';

export function fetchAllBuildpacks(settings) {
	return json(`${settings.cfInstance}/v2/buildpacks`, {
		headers: {
			Authorization: `${settings.token.token_type} ${settings.token.access_token}`
		},
		throwResponseError: true,
		strictSSL: false
	});
}
