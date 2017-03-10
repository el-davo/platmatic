import {json, post, Response} from 'web-request';
import {settings} from '../settings/settings.interface';

export function fetchServices(settings: settings, page: number, resultsPerPage: number) {
	return json(`${settings.cfInstance}/v2/services`, {
		headers: {
			Authorization: `${settings.token.token_type} ${settings.token.access_token}`
		},
		throwResponseError: true,
		strictSSL: false,
		qs: {page, 'results-per-page': resultsPerPage}
	});
}

export function fetchServicePurchaseInfo(settings: settings, page, service) {
	return json(`${settings.cfInstance}${service.entity.service_plans_url}`, {
		headers: {
			Authorization: `${settings.token.token_type} ${settings.token.access_token}`
		},
		throwResponseError: true,
		strictSSL: false
	});
}

export function fetchServiceInstance(settings, serviceGuid) {
	return json(`${settings.cfInstance}/v2/service_instances/${serviceGuid}`, {
		headers: {
			Authorization: `${settings.token.token_type} ${settings.token.access_token}`
		},
		throwResponseError: true,
		strictSSL: false
	});
}

export function purchaseService(settings: settings, name, space_guid, service_plan_guid): Promise<Response<string>> {
	return post(`${settings.cfInstance}/v2/service_instances?accepts_incomplete=true`, {
		headers: {
			Authorization: `${settings.token.token_type} ${settings.token.access_token}`
		},
		form: JSON.stringify({name, space_guid, service_plan_guid}),
		throwResponseError: true,
		strictSSL: false,
		json: true
	});
}
