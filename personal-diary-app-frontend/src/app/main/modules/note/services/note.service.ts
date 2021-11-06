import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {CREATE_URL, DELETE_BY_ID, GET_BY_ID_URL, GET_LIST_URL, UPDATE_URL} from "../../../core/constants/api";
import {IResponseBody} from "../../../core/models/response";
import {NoteModel} from "../models/note.model";
import {NOTE, NOTE_LIST_BY_CATEGORY} from "../constants/note.constant";

@Injectable({
    providedIn: 'root'
})
export class NoteService {


    constructor(private httpClient: HttpClient) {
    }

    create(i: NoteModel): Observable<NoteModel> {
        return this.httpClient.post<NoteModel>(NOTE + CREATE_URL, i);
    }

    update(i: NoteModel): Observable<NoteModel> {
        return this.httpClient.put<NoteModel>(NOTE + UPDATE_URL, i);
    }

    getById(id: number): Observable<NoteModel> {
        return this.httpClient.get<NoteModel>(NOTE + GET_BY_ID_URL + '/' + id);
    }

    getList(): Observable<NoteModel[]> {
        return this.httpClient.get<NoteModel[]>(NOTE + GET_LIST_URL);
    }

    getListWithPagination(page: number, size: number): Observable<IResponseBody<NoteModel>> {
        return this.httpClient.get<IResponseBody<NoteModel>>(NOTE + GET_LIST_URL + '/' + page + '/' + size);
    }

    deleteById(id: number): Observable<{ value: boolean }> {
        return this.httpClient.delete<{ value: boolean }>(NOTE + DELETE_BY_ID + '/' + id);
    }

    getNoteListByCategoryWithPagination(id: number, page: number, size: number) {
        return this.httpClient.get<IResponseBody<NoteModel>>(NOTE_LIST_BY_CATEGORY + '/' + id + '/' + page + '/' + size);
    }
}
