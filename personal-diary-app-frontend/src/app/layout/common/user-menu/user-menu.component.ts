import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {User} from '../../../main/core/user/user.model';
import {UserService} from '../../../main/core/user/user.service';
import {AuthService} from "../../../main/modules/auth/services/auth.service";


@Component({
    selector: 'user-menu',
    templateUrl: './user-menu.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'userMenu'
})
export class UserMenuComponent implements OnInit, OnDestroy {

    @Input() showAvatar: boolean = true;
    user: User;
    email: any;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _userService: UserService,
        private authService: AuthService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
        if (this.user == null) {
            this.user = {
                id: null,
                name: null,
                email: '',
                status: 'online'
            };
        }
        this.getUser();
    }

    getUser() {
        this.authService.getUser().subscribe(res => {
            if (res) {
                this.email = res.email;
            }
        })
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
     * Update the user status
     *
     * @param status
     */
    updateUserStatus(status: string): void {
        // Return if user is not available
        if (!this.user) {
            return;
        }

        // Update the user
        this._userService.update({
            ...this.user,
            status
        }).subscribe();
    }

    /**
     * Sign out
     */
    signOut(): void {
        this.authService.signOut();
        location.href = 'sign-in';
    }

}
