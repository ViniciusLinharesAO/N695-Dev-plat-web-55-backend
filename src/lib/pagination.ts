import { Is } from "./is";

export type Pagination<T> = {
    items: T[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    offset: number;
};

export namespace Pagination {
    export type Params = {
        pageSize: number | string;
        offset: number | string;
    };

    export const paginate = <T>(
        items: T[],
        totalItems: number | string,
        pagination: Pagination.Params,
    ): Pagination<T> => ({
        items,
        totalItems: +totalItems,
        currentPage: Is.Empty(items) ? 0 : Math.ceil((+pagination.offset + 1) / +pagination.pageSize),
        totalPages: Is.Empty(items) ? 0 : Math.ceil(+totalItems / +pagination.pageSize),
        offset: +pagination.offset,
        pageSize: +pagination.pageSize,
    });
}
