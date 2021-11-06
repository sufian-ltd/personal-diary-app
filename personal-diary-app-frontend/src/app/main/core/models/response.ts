export interface IResponseData {
}

export interface IResponseBody<D extends IResponseData> {
    content: D[];
    pageable: {};
    totalElements: number;
}
