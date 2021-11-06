import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FuseAnimations} from "../../../../../../@fuse/animations";
import {UnsubscribeAdapterComponent} from "../../../../core/helper/unsubscribeAdapter";
import {AuthService} from "../../services/auth.service";
import {SnackbarHelper} from "../../../../core/helper/snackbar.helper";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: FuseAnimations
})
export class SignUpComponent extends UnsubscribeAdapterComponent implements OnInit {

    signUpForm: FormGroup;

    constructor(private authService: AuthService,
                private snackbarHelper: SnackbarHelper) {
        super();
    }

    ngOnInit(): void {
        this.populateForm();
    }

    private populateForm() {
        this.signUpForm = new FormGroup({
            userName: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
        });
    }

    signUp() {
        console.log('111');
        console.log(this.signUpForm.value);
        this.subscribe$.add(
            this.authService.signUp(this.signUpForm.value).subscribe(res => {
                if (res) {
                    this.snackbarHelper.openSuccessSnackBarWithMessage('Registration Successful', 'Ok');
                    this.signUpForm.reset();
                } else {
                    this.snackbarHelper.openWarnSnackBarWithMessage('Please Try Again', 'Ok');
                }
            })
        );
    }
}
