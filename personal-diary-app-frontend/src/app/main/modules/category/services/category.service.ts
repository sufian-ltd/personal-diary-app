import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CATEGORY} from "../constants/category.constant";
import {Observable} from "rxjs";
import {CategoryModel} from "../models/category.model";
import {CREATE_URL, DELETE_BY_ID, GET_BY_ID_URL, GET_LIST_URL, UPDATE_URL} from "../../../core/constants/api";
import {IResponseBody} from "../../../core/models/response";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private httpClient: HttpClient) {
    }

    create(i: CategoryModel): Observable<CategoryModel> {
        return this.httpClient.post<CategoryModel>(CATEGORY + CREATE_URL, i);
    }

    update(i: CategoryModel): Observable<CategoryModel> {
        return this.httpClient.put<CategoryModel>(CATEGORY + UPDATE_URL, i);
    }

    getById(id: number): Observable<CategoryModel> {
        return this.httpClient.get<CategoryModel>(CATEGORY + GET_BY_ID_URL + '/' + id);
    }

    getList(): Observable<CategoryModel[]> {
        return this.httpClient.get<CategoryModel[]>(CATEGORY + GET_LIST_URL);
    }

    getListWithPagination(page: number, size: number): Observable<IResponseBody<CategoryModel>> {
        return this.httpClient.get<IResponseBody<CategoryModel>>(CATEGORY + GET_LIST_URL + '/' + page + '/' + size);
    }

    deleteById(id: number): Observable<{ value: boolean }> {
        return this.httpClient.delete<{ value: boolean }>(CATEGORY + DELETE_BY_ID + '/' + id);
    }

}
