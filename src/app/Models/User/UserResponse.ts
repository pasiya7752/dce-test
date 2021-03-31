import { UserVM } from './userVM';

export interface UserResponse {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: UserVM[];
    support: any;
}
