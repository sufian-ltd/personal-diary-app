import {Route} from '@angular/router';
import {SignUpComponent} from 'app/main/modules/auth/features/sign-up/sign-up.component';

export const authSignupRoutes: Route[] = [
    {
        path: '',
        component: SignUpComponent
    }
];
