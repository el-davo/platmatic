import {join} from 'path';
import {unlink} from 'fs';
import {ensureDir} from 'fs-extra';
import {readFile, writeFile}  from 'jsonfile';

let homeDirectory = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
let homeDir = join(homeDirectory, '.cf-live-monitor');
let settingsFilePath = join(homeDir, 'settings.json');

export function ensureSettingsDirectoryExists() {
	return new Promise((resolve, reject) => {
		ensureDir(homeDir, err => err ? reject(err) : resolve());
	});
}

export function saveToken(cfInstance, token) {
	return new Promise((resolve, reject) => {
		writeFile(settingsFilePath, {cfInstance, token}, {spaces: 2}, err => {
			err ? reject(err) : resolve();
		});
	});
}

export function getSettings() {
	return new Promise((resolve, reject) => {
		readFile(settingsFilePath, (err, settings) => {
			err ? reject(err) : resolve(settings);
		});
	});
}

export function logout() {
	return new Promise((resolve, reject) => {
		unlink(settingsFilePath, function (err) {
			err ? reject(err) : resolve();
		});
	});
}
