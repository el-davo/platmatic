import {json} from 'web-request';
import {settings} from '../settings/settings.interface';
import {controllerInfo} from './controllerInfo.interface';

export function getControllerInfo(settings: settings): Promise<controllerInfo> {
	return json<controllerInfo>(`${settings.cfInstance}/v2/info`, {
		strictSSL: false,
		throwResponseError: true,
		json: true
	});
}
