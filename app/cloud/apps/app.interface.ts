export interface App {
	entity: Entity;
	metadata: Metadata;
}

interface Entity {
	name: string;
	production: boolean;
	space_guid: string;
	stack_guid: string;
	buildpack: string;
	detected_buildpack: string;
	detected_buildpack_guid: string;
	environment_json: string;
	memory: number;
	instances: number;
	disk_quota: number;
	state: string;
	version: string;
	command: string;
	console: boolean;
	debug: string;
	staging_task_id: string;
	health_check_http_endpoint: string;
	health_check_type: string;
	health_check_timeout: number;
	staging_failed_reason: string;
	staging_failed_description: string;
	diego: boolean;
	docker_image: string;
	package_updated_at: string;
	detected_start_command: string;
	enable_ssh: boolean;
	ports: string[];
	space_url: string;
	stack_url: string;
	routes_url: string;
	events_url: string;
	service_bindings_url: string;
	route_mappings_url: string;
}

interface Metadata {
	guid: string;
	url: string;
	created_at: string;
	updated_at: string;
}
