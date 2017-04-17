import {eventChannel} from 'redux-saga';
import {post, Response} from 'web-request';
import * as ssh2 from 'ssh2';
import {respondToCommand, requestLogoutSSH} from '../../instance/ssh/ssh.actions';
import {controllerInfo} from "../controller/controllerInfo.interface";
import {Instance} from "../../settings/settings.state";

export function getOneTimePassword(instance: Instance, cfInfo: controllerInfo): Promise<Response<string>> {
	return post(`${cfInfo.authorization_endpoint}/oauth/authorize`, {
		headers: {
			Authorization: `${instance.token.token_type} ${instance.token.access_token}`,
			Accept: "application/json"
		},
		form: {
			client_id: 'ssh-proxy',
			response_type: 'code'
		},
		strictSSL: false,
		throwResponseError: true
	});
}

export function loginSSH(instance, password, appGuid, sshInstance = 0) {
	return new Promise((resolve, reject) => {
		let conn = new ssh2.Client();

		let [host, port] = instance.app_ssh_endpoint.split(':');

		conn
			.on('ready', () => {
				conn.shell((err, stream) => {
					resolve({conn, stream});
				})
			})
			.on('error', err => reject(err))
			.connect({
				host,
				port,
				username: `cf:${appGuid}/${sshInstance}`,
				password
			})
	});
}

export function listenToStream(stream) {
	return eventChannel(emitter => {

		stream.on('data', data => {
			emitter(respondToCommand(`${data}`));
		});

		stream.on('close', () => {
			emitter(requestLogoutSSH());
		});

		return () => {
		};
	});
}
