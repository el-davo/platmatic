import {Token} from '../../cloud/user/token.interface';

export const cfInstances = {
	showAddCfInstanceModal: false,
	isLoadingCfInstances: false,
	isAddingNewCfInstance: false,
	instances: {}
} as CfInstancesState;

export interface CfInstancesState {
	showAddCfInstanceModal: boolean;
	isLoadingCfInstances: boolean;
	isAddingNewCfInstance: boolean;
	instances: CfInstance
}

export interface CfInstance {
	[key: string]: Instance
}

export interface Instance {
	isLoggedIn: boolean;
	token: Token;
	cfInstance: string;
}
