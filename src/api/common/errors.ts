export namespace ErrorCodes {
    export enum API {
        Unexpected = "UNEXPECTED_ERROR",
        Schema = "SCHEMA_ERROR",
        Validation = "VALIDATION_ERROR",
        NotFound = "NOT_FOUND",
        External = "EXTERNAL_ERROR",
        NotAcceptable = "NOT_ACCEPTABLE",
        UnprocessableEntity = "UNPROCESSABLE_ENTITY",
        Unauthorized = "UNAUTHORIZED_ERROR",
    }

    export enum Cart {
        InvalidModifiers = "INVALID_PRODUCT_MODIFIERS",
        MissingMandatoryProducts = "MISSING_MANDATORY_PRODUCTS",
        MissingProducts = "MISSING_PRODUCTS",
        QuantityRange = "OUT_OF_QUANTITY_RANGE",
        InvalidDocument = "INVALID_DOCUMENT",
        InvalidType = "INVALID_TYPE",
        Reproved = "REPROVED",
    }

    export enum Agreement {
        AgreementNotFound = "AGREEMENT_NOT_FOUND",
        PlanNotFound = "PLAN_NOT_FOUND",
    }

    export enum Voucher {
        InvalidVoucher = "INVALID_VOUCHER",
        Inconsistency = "INCONSISTENCY",
        Unavailable = "UNAVAILABLE",
        VoucherNotAcceptable = "VOUCHER_NOT_ACCEPTABLE",
        UnavailableVoucher = "UNAVAILABLE_VOUCHER",
    }

    export enum OfferMigration {
        InvalidDocument = "INVALID_DOCUMENT",
    }

    export type ResponseErrorCodes = API | Agreement | Cart | Voucher | OfferMigration;
}
