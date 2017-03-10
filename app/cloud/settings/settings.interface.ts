export interface settings {
	cfInstance: string;
	token: token;
}

export interface token {
	token_type: string;
	access_token: string;
	refresh_token: string;
	expires_in: number;
	scope: string;
	jti: string;
}
