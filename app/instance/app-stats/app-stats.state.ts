import {summary, stats} from '../../cloud/app-stats/app-stats.interface';
import {App} from '../../cloud/apps/app.interface';

export const appStats = {
    isFetchingAppStats: true,
    isRefreshingAppStats: false,
    isScalingApp: false,
    showScaleDialog: false,
    stats: <stats>{},
    summary: <summary>{},
    serviceBinding: [],
    environmentVariables: {},
    app: {} as App
};

export interface appStatsState {
	isFetchingAppStats: boolean;
	isRefreshingAppStats: boolean;
    isScalingApp:  boolean;
    showScaleDialog: boolean;
    stats?: stats;
    summary?: summary;
    serviceBinding: Array<any>;
    environmentVariables: any;
    app: App;
}
