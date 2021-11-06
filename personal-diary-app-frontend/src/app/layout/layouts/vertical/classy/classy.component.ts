import {Component, HostListener, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {BehaviorSubject, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FuseMediaWatcherService} from '@fuse/services/media-watcher';
import {FuseNavigationService} from '@fuse/components/navigation';
import {InitialData} from 'app/app.types';
import {TranslateService} from '@ngx-translate/core';
import {locale as lngEnglish} from './i18n/en';
import {locale as lngBangla} from './i18n/bn';
import {FuseTranslationLoaderService} from '../../../../main/core/services/translation-loader.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {LayoutHelperService} from '../services/layout-helper.service';
import {ViewportScroller} from "@angular/common";
import {UserService} from "../../../../main/core/user/user.service";
import {AuthService} from "../../../../main/modules/auth/services/auth.service";

@Component({
    selector: 'classy-layout',
    templateUrl: './classy.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ClassyLayoutComponent implements OnInit, OnDestroy {
    pageYoffset = 0;

    @HostListener('window:scroll', ['$event']) onScroll(event) {
        this.pageYoffset = window.pageYOffset;
    }

    data: InitialData;
    isScreenSmall: boolean;
    selectedLanguage: any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    navigation;
    email: string;
    actionSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    actionData = this.actionSubject.asObservable();

    // profileImageUrl: string = '/assets/images/avatars/user_profile_icon.png';

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private authService: AuthService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
        private _translateService: TranslateService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _http: HttpClient,
        private cookieService: CookieService,
        private layoutHelperService: LayoutHelperService,
        private _userService: UserService,
        private scroll: ViewportScroller
    ) {
        // Set Default Selected Lang
        this.selectedLanguage = _fuseTranslationLoaderService.getActiveLang();
        const headers = new HttpHeaders().set('token', this.cookieService.get("access_token"));
        this.navLanguageSwitcher(this.selectedLanguage);
        // Nav Initial Language
        this.navLanguageSwitcher('en');
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.getUser();
        // Subscribe to the resolved route mock-api
        this._activatedRoute.data.subscribe((data: Data) => {
            this.data = data.initialData;
        });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    scrollToTop() {
        this.scroll.scrollToPosition([0, 0]);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
        // Get the navigation
        const navigation = this._fuseNavigationService.getComponent(name);

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
    }

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void {

        // Set the selected language for the toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this._translateService.use(lang);

        // Nav Language Change
        this.navLanguageSwitcher(this.selectedLanguage);
        this.layoutHelperService.setLanguageEvent(this.selectedLanguage);
    }

    private navLanguageSwitcher(selectedLanguage: string): void {
        if (selectedLanguage === 'en') {
            this.navigation = lngEnglish.data.NAV;
        } else if (selectedLanguage === 'bn') {
            this.navigation = lngBangla.data.NAV;
        }

    }

    getUser() {
        this.authService.getUser().subscribe(res => {
            if (res) {
                this.email = res.email;
            }
        })
    }

}
