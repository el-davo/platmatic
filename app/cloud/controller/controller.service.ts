import {json} from 'web-request';
import {controllerInfo} from './controllerInfo.interface';
import {Instance} from "../../settings/settings.state";

export function getControllerInfo(instance: Instance): Promise<controllerInfo> {
	return json<controllerInfo>(`${instance.cfInstance}/v2/info`, {
		strictSSL: false,
		throwResponseError: true,
		json: true
	});
}
