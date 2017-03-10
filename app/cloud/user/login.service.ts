import {post, Response} from 'web-request';

export function login(authorization_endpoint: string, username: string, password: string): Promise<Response<string>> {
	return post(`${authorization_endpoint}/oauth/token`, {
		headers: {
			Authorization: 'Basic Y2Y6',
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		strictSSL: false,
		throwResponseError: true,
		json: true,
		form: {
			grant_type: 'password',
			client_id: 'cf',
			username,
			password
		}
	});
}
