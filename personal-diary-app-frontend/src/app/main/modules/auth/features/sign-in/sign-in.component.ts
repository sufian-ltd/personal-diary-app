import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {SnackbarHelper} from "../../../../core/helper/snackbar.helper";
import {UnsubscribeAdapterComponent} from "../../../../core/helper/unsubscribeAdapter";
import {UserService} from "../../../../core/user/user.service";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent extends UnsubscribeAdapterComponent implements OnInit {

    signInForm: FormGroup;

    constructor(private authService: AuthService,
                private _userService: UserService,
                private snackbarHelper: SnackbarHelper) {
        super();
    }

    ngOnInit(): void {
        this.populateForm();
    }

    private populateForm() {
        this.signInForm = new FormGroup({
            userName: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        });
    }

    signIn() {
        this.subscribe$.add(
            this.authService.signIn(this.signInForm.value).subscribe(res => {
                    this.authService.accessToken = res.token;
                    this.authService._authenticated = true;
                    this._userService.user = {email: "", id: "", 'name': res.userName};
                    this.snackbarHelper.openSuccessSnackBarWithMessage('Login Successful', 'Ok');
                    location.href = 'categories';
                }, error => {
                    this.snackbarHelper.openWarnSnackBarWithMessage('User Not Found', 'Ok');
                }
            )
        )
    }
}
