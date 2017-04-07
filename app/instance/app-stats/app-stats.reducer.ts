import initialState from '../../initialState';
import {appStats, appStatsState} from './app-stats.state';
import {summary, stats} from '../../cloud/app-stats/app-stats.interface';
import {
	FETCH_APP_STATS,
	REFRESH_APP_STATS,
	UPDATE_APP_STATS,
	UPDATE_APP_STATS_MEM_CPU,
	CLEAR_STATS,
	OPEN_SCALE_DIALOG,
	CLOSE_SCALE_DIALOG,
	REQUEST_SCALE_APP,
	SCALE_APP_COMPLETED
} from './app-stats.action-types';

export function appStatsReducer(state: appStatsState = appStats, action): appStatsState {
	switch (action.type) {
		case FETCH_APP_STATS:
			return {...state, isFetchingAppStats: true};
		case REFRESH_APP_STATS:
			return {...state, isRefreshingAppStats: true};
		case UPDATE_APP_STATS:
			return {
				...state,
				stats: action.stats,
				summary: action.summary,
				serviceBindings: action.serviceBindings,
				environmentVariables: action.environmentVariables,
				app: action.app,
				isFetchingAppStats: false,
				isRefreshingAppStats: false
			};
		case UPDATE_APP_STATS_MEM_CPU:
			return {
				...state,
				stats: action.memCpu,
			};
		case CLEAR_STATS:
			return {...state, stats: <stats>{}, summary: <summary>{}, environmentVariables: {}};
		case OPEN_SCALE_DIALOG:
			return {...state, showScaleDialog: true};
		case CLOSE_SCALE_DIALOG:
			return {...state, showScaleDialog: false};
		case REQUEST_SCALE_APP:
			return {...state, isScalingApp: true};
		case SCALE_APP_COMPLETED:
			return {...state, isScalingApp: false};
		default:
			return state;
	}
}
