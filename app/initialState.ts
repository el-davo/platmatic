import {users} from './instance/users/users.state';
import {appStats} from './instance/app-stats/app-stats.state';

export default {
	settings: {
		isLoggedIn: false,
		isLoggingIn: false,
		isTokenExpired: false,
		isReadingSettings: true,
		isRefreshingToken: false,
		isSettingsLoaded: false,
		loginFailed: false,
		cfInstance: null,
		token: {}
	},
	organizations: {
		isFetchingOrganizations: false,
		isFetchingOrganizationSummary: false,
		results: [],
		summary: {}
	},
	quota: {
		isFetchingQuota: false,
		result: {}
	},
	spaces: {
		isFetchingSpaces: false,
		result: []
	},
	serviceInstances: {
		page: 1,
		isFetchingServiceInstances: false,
		fetchingServiceInstancesFailed: false,
		instances: []
	},
	apps: {
		page: 1,
		resultsPerPage: 25,
		isFetchingApps: false,
		result: {
			resources: []
		}
	},
	appStats,
	serviceInfo: {},
	activePage: 'home',
	search: {
		showSearchOverlay: false,
		cache: {
			apps: [],
			market: []
		},
		appResults: [],
		spacesResults: [],
		marketResults: []
	},
	stacks: {
		isFetchingStacks: false,
		result: []
	},
	events: {
		fetchEvents: false,
		list: []
	},
	ssh: {
		app: null,
		appInstance: 0,
		isConnectingToSSH: false,
		isLoggingOut: false,
		isLoggedIn: false,
		loginFailed: false,
		isSendingCommand: false
	},
	createApp: {
		showCreateAppDialog: false,
		targetDirectory: '',
		form: {
			isFetchingFormData: false,
			isFetchFormDataFailed: false,
			spaces: [],
			stacks: [],
			buildpacks: [],
			domains: []
		},
		initializing: {},
		success: {},
		failed: {}
	},
	logs: {
		app: null,
		isConnectingToWebSocket: false,
		isConnectedToWebSocket: false
	},
	market: {
		isFetchingMarketAssets: false,
		purchasePlans: {
			spaces: [],
			isFetchingPurchaseInfo: false,
			isFetchingSpaces: false,
			isPurchasingService: false,
			showPurchaseOverlay: false,
			showPurchaseSelectSpace: false,
			showPurchaseCompleteScreen: false,
			selectedPurchasePlan: {},
			page: 1,
			service: {},
			plans: []
		},
		page: 1,
		resultsPerPage: 20,
		totalPages: 0,
		assets: []
	},
	users
};
