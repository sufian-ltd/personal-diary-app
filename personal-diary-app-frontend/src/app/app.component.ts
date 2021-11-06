import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "./main/modules/auth/services/auth.service";
import {CookieService} from "ngx-cookie-service";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    /**
     * Constructor
     */
    constructor(private _translateService: TranslateService,
                private router: Router, private _authService: AuthService, private _http: HttpClient, private cookieService: CookieService) {
        // Add languages
        this._translateService.addLangs(['en', 'bn']);

        // Set the default language
        this._translateService.setDefaultLang('en');

        // Use a language
        this._translateService.use('en');
    }

    bool: boolean = true;
    navigation;

    ngOnInit() {
    }
}
