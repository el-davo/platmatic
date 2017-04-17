import {get} from 'request';
import {Instance} from "../../settings/settings.state";

export function fetchAppSummary(instance: Instance, guid) {
	return new Promise((resolve, reject) => {
		get(`${instance.cfInstance}/v2/apps/${guid}/summary`, {
			headers: {
				Authorization: `${instance.token.token_type} ${instance.token.access_token}`
			},
			rejectUnauthorized: false,
			json: true
		}, (err, response, body) => {
			err ? reject(err) : resolve(body);
		});
	});
}

export function fetchAppStats(instance: Instance, guid) {
	return new Promise((resolve, reject) => {
		get(`${instance.cfInstance}/v2/apps/${guid}/stats`, {
			headers: {
				Authorization: `${instance.token.token_type} ${instance.token.access_token}`
			},
			rejectUnauthorized: false,
			json: true
		}, (err, response, body) => {
			err ? reject(err) : resolve(body);
		});
	});
}

export function fetchAppEnvironmentVariables(instance: Instance, guid) {
	return new Promise((resolve, reject) => {
		get(`${instance.cfInstance}/v2/apps/${guid}/env`, {
			headers: {
				Authorization: `${instance.token.token_type} ${instance.token.access_token}`
			},
			rejectUnauthorized: false,
			json: true
		}, (err, response, body) => {
			err ? reject(err) : resolve(body);
		});
	});
}

export function fetchAppServiceBindings(instance: Instance, guid) {
	return new Promise((resolve, reject) => {
		get(`${instance.cfInstance}/v2/apps/${guid}/service_bindings`, {
			headers: {
				Authorization: `${instance.token.token_type} ${instance.token.access_token}`
			},
			qs: {
				'inline-relations-depth': 2
			},
			rejectUnauthorized: false,
			json: true
		}, (err, response, body) => {
			err ? reject(err) : resolve(body);
		});
	});
}
