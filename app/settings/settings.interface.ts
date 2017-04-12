import {Token} from '../cloud/user/token.interface';

export interface Settings {
	cfInstances: CfInstance[]
}

export interface CfInstance {
	cfInstance: string;
	token: Token
}
