import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {AuthUtils} from '../../../core/auth/auth.utils';
import {UserService} from '../../../core/user/user.service';
import {CookieService} from 'ngx-cookie-service';
import {AUTH, GET_USER} from "../constants/auth.constant";
import {SignInResponseModel} from "../models/sign-in-response.model";
import {UserModel} from "../models/user.model";
import {map} from "rxjs/operators";


@Injectable()
export class AuthService {

    public _authenticated: boolean = false;

    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
        private cookieService: CookieService
    ) {
    }

    signUp(signInRequest: any): Observable<any> {
        console.log(signInRequest);
        return this._httpClient.post(AUTH + 'sign-up', signInRequest);
    }

    set accessToken(token: string) {
        this.cookieService.set('access_token', token);
    }

    get accessToken(): string {
        return this.cookieService.get('access_token') ? this.cookieService.get('access_token') : '';
    }

    checkAcessToken(): boolean {
        return this.cookieService.check('access_token');
    }

    signIn(credentials: { username: string, password: string }): Observable<SignInResponseModel> {
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }
        return this._httpClient.post<SignInResponseModel>(AUTH + 'sign-in', credentials);
    }

    signOut(): Observable<any> {
        this.cookieService.delete('access_token');
        this._authenticated = false;
        return of(true);
    }

    check(): Observable<boolean> {
        if (this._authenticated) {
            return of(true);
        }
        if (!this.checkAcessToken) {
            return of(false);
        }

        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }
    }

    getUser(): Observable<UserModel> {
        return this._httpClient.get<UserModel>(GET_USER).pipe(map((res: any) => {
            return res;
        }));
    }
}
