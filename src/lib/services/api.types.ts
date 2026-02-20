export interface BaseResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}

export interface ListResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}