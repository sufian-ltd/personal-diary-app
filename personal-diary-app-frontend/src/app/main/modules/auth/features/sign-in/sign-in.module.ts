import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FuseCardModule} from '@fuse/components/card';
import {FuseAlertModule} from '@fuse/components/alert';
import {SignInComponent} from 'app/main/modules/auth/features/sign-in/sign-in.component';
import {authSignInRoutes} from 'app/main/modules/auth/features/sign-in/sign-in.routing';
import {SharedModule} from '../../../../shared/shared.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatCardModule} from "@angular/material/card";

@NgModule({
    declarations: [
        SignInComponent
    ],
    imports: [
        RouterModule.forChild(authSignInRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        FuseCardModule,
        FuseAlertModule,
        SharedModule,
        FlexLayoutModule,
        MatCardModule
    ]
})
export class AuthSignInModule {
}
