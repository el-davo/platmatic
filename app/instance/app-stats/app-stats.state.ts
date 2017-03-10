import {summary, stats} from '../../cloud/app-stats/app-stats.interface';

export const appStats = {
    isFetchingAppStats: false,
    isRefreshingAppStats: false,
    isScalingApp: false,
    showScaleDialog: false,
    stats: <stats>{},
    summary: <summary>{},
    serviceBinding: [],
    environmentVariables: {}
}

export interface appStatsState {
	isFetchingAppStats: boolean;
	isRefreshingAppStats: boolean;
    isScalingApp:  boolean;
    showScaleDialog: boolean;
    stats?: stats;
    summary?: summary;
    serviceBinding: Array<any>;
    environmentVariables: any;
}