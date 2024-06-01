export namespace ErrorCodes {
    export enum API {
        Unexpected = "UNEXPECTED_ERROR",
        Schema = "SCHEMA_ERROR",
        Validation = "VALIDATION_ERROR",
        NotFound = "NOT_FOUND",
        Unauthorized = "UNAUTHORIZED_ERROR",
    }

    export type ResponseErrorCodes = API;
}
