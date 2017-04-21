import {Token} from '../../cloud/user/token.interface';

export const cfInstances = {
	showAddCfInstanceModal: false,
	isLoadingCfInstances: false,
	isAddingNewCfInstance: false,
	isDeletingCfInstance: false,
	instances: {}
} as CfInstancesState;

export interface CfInstancesState {
	showAddCfInstanceModal: boolean;
	isLoadingCfInstances: boolean;
	isAddingNewCfInstance: boolean;
	isDeletingCfInstance: boolean;
	instances: CfInstances
}

export interface CfInstances {
	[key: string]: Instance
}

export interface Instance {
	isLoggedIn: boolean;
	token: Token;
	cfInstance: string;
}
