import {
	FETCH_APP_STATS,
	REFRESH_APP_STATS,
	UPDATE_APP_STATS,
	UPDATE_APP_DATA,
	UPDATE_APP_STATS_MEM_CPU,
	CLEAR_STATS,
	OPEN_SCALE_DIALOG,
	CLOSE_SCALE_DIALOG,
	REQUEST_SCALE_APP,
	SCALE_APP_COMPLETED
} from './app-stats.action-types';

export function fetchAppStats(guid) {
	return {type: FETCH_APP_STATS, guid}
}

export function refreshAppStats(guid) {
	return {type: REFRESH_APP_STATS, guid};
}

export function updateAppStats(stats, summary, serviceBindings, environmentVariables, app) {
	return {type: UPDATE_APP_STATS, stats, summary, serviceBindings, environmentVariables, app}
}

export function updateAppData(app) {
	return {type: UPDATE_APP_DATA, app}
}

export function updateAppStatsMemCpu(memCpu) {
	return {type: UPDATE_APP_STATS_MEM_CPU, memCpu};
}

export function clearStats() {
	return {type: CLEAR_STATS};
}

export function openScaleDialog() {
	return {type: OPEN_SCALE_DIALOG};
}

export function closeScaleDialog() {
	return {type: CLOSE_SCALE_DIALOG};
}

export function requestScaleApp(guid: string, instances: number, memory: number, disk: number) {
	return {type: REQUEST_SCALE_APP, guid, instances, memory, disk};
}

export function scaleAppCompleted() {
	return {type: SCALE_APP_COMPLETED};
}
