import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InitialDataResolver} from '../../../app.resolvers';
import {LayoutComponent} from '../../../layout/layout.component';
import {AuthGuard} from '../../core/guards/auth.guard';
import {CategoryComponent} from './features/category/category.component';


const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {path: 'categories', component: CategoryComponent}
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})


export class CategoryRoutingModule {
}
