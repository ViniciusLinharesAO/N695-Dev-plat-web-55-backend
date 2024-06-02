export type RegisterReqBody = {
    name: string;
    email: string;
    password: string;
};

export type RequestResponse = {
    success: boolean;
    message: string;
    items: Array<any>;
};
