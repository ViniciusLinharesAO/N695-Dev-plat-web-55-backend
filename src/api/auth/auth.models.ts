export type RegisterReqBody = {
    email: string;
    password: string;
};

export type RequestResponse = {
    success: boolean;
    message: string;
    items: Array<any>;
};
