import {post, Response} from 'web-request';
import {controllerInfo} from '../controller/controllerInfo.interface';
import {Instance} from "../../settings/settings.state";

export function refreshCloudToken(instance: Instance, controllerInfo: controllerInfo): Promise<Response<string>> {
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
			refresh_token: instance.token.refresh_token
		}
	});
}
