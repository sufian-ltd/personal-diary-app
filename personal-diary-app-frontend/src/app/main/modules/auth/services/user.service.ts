import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../../../environments/environment";
import {UserModel} from "../models/user.model";
import {AUTH, GET_USER} from "../constants/auth.constant";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    baseUrl = environment.diary.baseApiEndPoint + AUTH;

    constructor(private http: HttpClient) {
    }

}
