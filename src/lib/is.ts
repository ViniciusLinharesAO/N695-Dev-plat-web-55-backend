export namespace Is {
    export const Undefined = (x: any): x is undefined => x === undefined;
    export const Null = (x: any): x is null => x === null;
    export const Filled = (x: any) => !Null(x) && !Undefined(x);
    export const Empty = (list: any): list is [] => Filled(list) && list.length === 0;
    export const EmptyObject = (obj: Record<string, any>): boolean => {
        return Object.keys(obj).length === 0;
    };
}
