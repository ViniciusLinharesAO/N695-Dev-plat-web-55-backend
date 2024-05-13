export type RequestParams = {
    id: string;
};
export type CreateUserReqBody = {
    email: string;
    password: string;
};

export type RequestResponse = {
    success: boolean;
    message: string;
    items: Array<any>;
};

export type PaginateQuery = {
    pageNumber: number;
    pageSize: number;
};

export type PaginatedResponse = RequestResponse & {
    pageSize: number;
    pageNumber: number;
    totalItems: number;
};
