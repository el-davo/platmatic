import {post, Response} from 'web-request';
import {settings} from '../settings/settings.interface';
import {controllerInfo} from '../controller/controllerInfo.interface';

export function refreshCloudToken(settings: settings, controllerInfo: controllerInfo): Promise<Response<string>> {
	return post(`${controllerInfo.authorization_endpoint}/oauth/token`, {
		headers: {
			Authorization: 'Basic Y2Y6',
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		strictSSL: false,
		throwResponseError: true,
		json: true,
		form: {
			grant_type: "refresh_token",
			refresh_token: settings.token.refresh_token
		}
	});
}
