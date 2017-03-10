export interface summary {
    available_domains: Array<domain>;
    buildpack: string;
    command: string;
    debug: string;
    detected_buildpack: string;
    detected_buildpack_guid: string;
    detected_start_command: string;
    diego: boolean;
    disk_quota: number;
    enable_ssh: boolean;
    guid: string;
    health_check_http_endpoint?: string;
    health_check_timeout?: number;
    instances: number;
    memory: number;
    name: string;
    package_state: string;
    package_updated_at: string;
    ports?: Array<string>;
    production: boolean;
    routes: Array<route>;
    space_guid: string;
    stack_guid: string;
    staging_failed_description?: string;
    staging_failed_reason?: string;
    staging_task_id: string;
    state: string;
    version: string;
}

export interface stats {
    state: string;
    stats: statsInner
}

interface route {
    guid: string;
    host: string;
    path: string;
    port?: number;
}

interface domain {
    guid: string;
    name: string;
    owning_organization_guid: string;
}

interface statsInner {
    disk_quota: number;
    fds_quota: number;
    host: string;
    mem_quota: number;
    name: string;
    port: number;
    uptime: number;
    uris: Array<string>;
    usage: usage;
}

interface usage {
    cpu: number;
    disk: number;
    mem: number;
    time: string;
}