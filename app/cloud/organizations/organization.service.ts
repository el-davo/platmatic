import {get} from 'request';
import {Instance} from "../../settings/settings.state";

export function fetchOrganizations(instance: Instance) {
	return new Promise((resolve, reject) => {
		get(`${instance.cfInstance}/v2/organizations`, {
			headers: {
				Authorization: `${instance.token.token_type} ${instance.token.access_token}`,
				Accept: "application/json"
			},
			json: true,
			rejectUnauthorized: false
		}, (err, response, data) => {
			err ? reject(err) : resolve(data);
		});
	});
}

export function fetchOrganizationSummary(instance: Instance, organization_guid) {
	return new Promise((resolve, reject) => {
		get(`${instance.cfInstance}/v2/organizations/${organization_guid}/summary`, {
			headers: {
				Authorization: `${instance.token.token_type} ${instance.token.access_token}`,
				Accept: "application/json"
			},
			json: true,
			rejectUnauthorized: false
		}, (err, response, data) => {
			err ? reject(err) : resolve(data);
		});
	});

}
