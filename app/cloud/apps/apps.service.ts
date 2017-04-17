import * as WebRequest from 'web-request';
import {Instance} from "../../settings/settings.state";

export function fetchAppsInSpace(instance: Instance, guid: string, apps) {
	return WebRequest.json(`${instance.cfInstance}/v2/spaces/${guid}/apps`, {
		headers: {
			Authorization: `${instance.token.token_type} ${instance.token.access_token}`
		},
		throwResponseError: true,
		strictSSL: false,
		qs: {
			page: apps.page,
			'results-per-page': apps.resultsPerPage
		}
	});
}

export function fetchApp(instance: Instance, guid) {
	return WebRequest.json(`${instance.cfInstance}/v2/apps/${guid}`, {
		headers: {
			Authorization: `${instance.token.token_type} ${instance.token.access_token}`
		},
		throwResponseError: true,
		strictSSL: false
	});
}

export function fetchAppSummary(instance: Instance, guid) {
	return WebRequest.json(`${instance.cfInstance}/v2/apps/${guid}/summary`, {
		headers: {
			Authorization: `${instance.token.token_type} ${instance.token.access_token}`
		},
		throwResponseError: true,
		strictSSL: false
	});
}

export function startApp(instance: Instance, guid) {
	return WebRequest.put(`${instance.cfInstance}/v2/apps/${guid}`, {
		headers: {
			Authorization: `${instance.token.token_type} ${instance.token.access_token}`
		},
		throwResponseError: true,
		strictSSL: false,
		form: JSON.stringify({state: 'STARTED'})
	});
}

export function stopApp(instance: Instance, guid) {
	return WebRequest.put(`${instance.cfInstance}/v2/apps/${guid}`, {
		headers: {
			Authorization: `${instance.token.token_type} ${instance.token.access_token}`
		},
		throwResponseError: true,
		strictSSL: false,
		form: JSON.stringify({state: 'STOPPED'})
	});
}

export function deleteApp(instance: Instance, app_guid) {
	return WebRequest.delete(`${instance.cfInstance}/v2/apps/${app_guid}`, {
		headers: {
			Authorization: `${instance.token.token_type} ${instance.token.access_token}`
		},
	})
}

export function fetchAllApps(instance: Instance, page) {
	return WebRequest.json(`${instance.cfInstance}/v2/apps`, {
		headers: {
			Authorization: `${instance.token.token_type} ${instance.token.access_token}`
		},
		throwResponseError: true,
		strictSSL: false,
		qs: {
			page
		}
	});
}

export function scaleApp(instance: Instance, guid: string, instances: number, memory: number, disk: number) {
	return WebRequest.put(`${instance.cfInstance}/v2/apps/${guid}`, {
		headers: {
			Authorization: `${instance.token.token_type} ${instance.token.access_token}`
		},
		throwResponseError: true,
		strictSSL: false,
		form: JSON.stringify({instances, memory, disk_quota: disk})
	});
}

export function restageApp(instance: Instance, guid: string) {
	return WebRequest.post(`${instance.cfInstance}/v2/apps/${guid}/restage`, {
		headers: {
			Authorization: `${instance.token.token_type} ${instance.token.access_token}`
		}
	});
}
