import { ErrorCodes } from "./../api/common/errors";
import { StatusCode } from "./../api/http/status-code";

export type Issue = {
    code: string;
    message: string;
    field: Array<number | string>;
    extra?: any;
};

export class AppError {
    constructor(
        public status: StatusCode,
        public message: string,
        public errorCode?: ErrorCodes.ResponseErrorCodes,
        public issues?: Issue[],
        public stack?: any,
    ) {}
}

export class InternalError extends AppError {
    constructor(
        public message: string,
        public stack?: any,
    ) {
        super(StatusCode.INTERNAL_SERVER_ERROR, message, ErrorCodes.API.Unexpected, [], stack);
    }
}

export class ValidationError extends AppError {
    constructor(public issues: Issue[]) {
        super(StatusCode.BAD_REQUEST, "Schema validation error", ErrorCodes.API.Schema, issues);
    }
}

export class NotFoundError extends AppError {
    constructor(entity: string) {
        super(StatusCode.NOT_FOUND, `No ${entity} found with the provided infos`, ErrorCodes.API.NotFound);
    }
}

export type ErrorResponse = {
    code: ErrorCodes.ResponseErrorCodes;
    errors: Issue[];
    message: string;
};
