export interface user {
	entity: entity;
	metadata: metadata;
}

interface entity {
	admin: boolean;
	active: boolean;
	default_space_guid: string;
	username: string;
	default_space_url: string;
	spaces_url: string;
	organizations_url: string;
	managed_organizations_url: string;
	billing_managed_organizations_url: string;
	audited_organizations_url: string;
	managed_spaces_url: string;
	audited_spaces_url: string;
}

interface metadata {
	guid: string;
	url: string;
	created_at: string;
	updated_at: string;
}
