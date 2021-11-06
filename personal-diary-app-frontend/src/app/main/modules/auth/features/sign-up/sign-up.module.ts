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
import {SignUpComponent} from 'app/main/modules/auth/features/sign-up/sign-up.component';
import {authSignupRoutes} from 'app/main/modules/auth/features/sign-up/sign-up.routing';
import {SharedModule} from '../../../../shared/shared.module';
import {MatCardModule} from "@angular/material/card";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
    declarations: [
        SignUpComponent
    ],
    imports: [
        RouterModule.forChild(authSignupRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        FuseCardModule,
        FuseAlertModule,
        SharedModule,
        MatCardModule,
        FlexLayoutModule
    ]
})
export class AuthSignUpModule {
}
