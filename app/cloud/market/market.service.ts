import {json, post, Response} from 'web-request';
import {Instance} from "../../settings/settings.state";

export function fetchServices(instance: Instance, page: number, resultsPerPage: number) {
	return json(`${instance.cfInstance}/v2/services`, {
		headers: {
			Authorization: `${instance.token.token_type} ${instance.token.access_token}`
		},
		throwResponseError: true,
		strictSSL: false,
		qs: {page, 'results-per-page': resultsPerPage}
	});
}

export function fetchServicePurchaseInfo(instance: Instance, page: number, service) {
	return json(`${instance.cfInstance}${service.entity.service_plans_url}`, {
		headers: {
			Authorization: `${instance.token.token_type} ${instance.token.access_token}`
		},
		throwResponseError: true,
		strictSSL: false
	});
}

export function fetchServiceInstance(instance: Instance, serviceGuid) {
	return json(`${instance.cfInstance}/v2/service_instances/${serviceGuid}`, {
		headers: {
			Authorization: `${instance.token.token_type} ${instance.token.access_token}`
		},
		throwResponseError: true,
		strictSSL: false
	});
}

export function purchaseService(instance: Instance, name, space_guid, service_plan_guid): Promise<Response<string>> {
	return post(`${instance.cfInstance}/v2/service_instances?accepts_incomplete=true`, {
		headers: {
			Authorization: `${instance.token.token_type} ${instance.token.access_token}`
		},
		form: JSON.stringify({name, space_guid, service_plan_guid}),
		throwResponseError: true,
		strictSSL: false,
		json: true
	});
}
