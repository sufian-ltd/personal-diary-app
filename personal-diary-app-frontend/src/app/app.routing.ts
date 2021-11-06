import {Route} from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";

export const appRoutes: Route[] = [
    {path: '', pathMatch: 'full', redirectTo: 'sign-in'},
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'sign-in',
                loadChildren: () => import('app/main/modules/auth/features/sign-in/sign-in.module').then(m => m.AuthSignInModule)
            },
            {
                path: 'sign-up',
                loadChildren: () => import('app/main/modules/auth/features/sign-up/sign-up.module').then(m => m.AuthSignUpModule)
            }
        ]
    },
];
