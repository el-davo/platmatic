import * as WebRequest from 'web-request';
import { settings } from '../settings/settings.interface';

export function fetchAppsInSpace(settings: settings, guid: string, apps) {
	return WebRequest.json(`${settings.cfInstance}/v2/spaces/${guid}/apps`, {
		headers: {
			Authorization: `${settings.token.token_type} ${settings.token.access_token}`
		},
		throwResponseError: true,
		strictSSL: false,
		qs: {
			page: apps.page,
			'results-per-page': apps.resultsPerPage
		}
	});
}

export function fetchAppSummary(settings, guid) {
	return WebRequest.json(`${settings.cfInstance}/v2/apps/${guid}/summary`, {
		headers: {
			Authorization: `${settings.token.token_type} ${settings.token.access_token}`
		},
		throwResponseError: true,
		strictSSL: false
	});
}

export function startApp(settings: settings, guid) {
	return WebRequest.put(`${settings.cfInstance}/v2/apps/${guid}`, {
		headers: {
			Authorization: `${settings.token.token_type} ${settings.token.access_token}`
		},
		throwResponseError: true,
		strictSSL: false,
		form: JSON.stringify({ state: 'STARTED' })
	});
}

export function stopApp(settings, guid) {
	return WebRequest.put(`${settings.cfInstance}/v2/apps/${guid}`, {
		headers: {
			Authorization: `${settings.token.token_type} ${settings.token.access_token}`
		},
		throwResponseError: true,
		strictSSL: false,
		form: JSON.stringify({ state: 'STOPPED' })
	});
}

export function deleteApp(settings, app_guid) {
	return WebRequest.delete(`${settings.cfInstance}/v2/apps/${app_guid}`, {
		headers: {
			Authorization: `${settings.token.token_type} ${settings.token.access_token}`
		},
	})
}

export function fetchAllApps(settings: settings, page) {
	return WebRequest.json(`${settings.cfInstance}/v2/apps`, {
		headers: {
			Authorization: `${settings.token.token_type} ${settings.token.access_token}`
		},
		throwResponseError: true,
		strictSSL: false,
		qs: {
			page
		}
	});
}

export function scaleApp(settings: settings, guid: string, instances: number, memory: number, disk: number) {
	return WebRequest.put(`${settings.cfInstance}/v2/apps/${guid}`, {
		headers: {
			Authorization: `${settings.token.token_type} ${settings.token.access_token}`
		},
		throwResponseError: true,
		strictSSL: false,
		form: JSON.stringify({ instances, memory, disk_quota: disk })
	});
}

export function restageApp(settings: settings, guid: string) {
	return WebRequest.post(`${settings.cfInstance}/v2/apps/${guid}/restage`, {
		headers: {
			Authorization: `${settings.token.token_type} ${settings.token.access_token}`
		}
	});
}
