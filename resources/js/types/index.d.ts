export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface PaginationData {
   url?:string
   label:string
   active:boolean
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    session: {
        success: string|null;
        error: string|null;
        fail: string|null;
    };
    page_num:number;
};
