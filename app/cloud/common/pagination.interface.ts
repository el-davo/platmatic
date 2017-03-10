export interface pagination<resources> {
    total_results: number;
    total_pages: number;
    prev_url: string;
    next_url: string;
    resources: Array<resources>
}