import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TranslateModule} from '@ngx-translate/core';

import {AuthGuard} from '../../core/auth/guards/auth.guard';
import {NoteRoutingModule} from './note-routing.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {FuseCardModule} from '../../../../@fuse/components/card';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {RouterModule} from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {MatSortModule} from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRadioModule} from '@angular/material/radio';
import {NoteComponent} from './features/note/note.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {SharedModule} from '../../shared/shared.module';


const _materialModule = [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatTableModule,
    MatCheckboxModule,
    MatCardModule,
    MatSnackBarModule
];

@NgModule({
    declarations: [
        NoteComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        NoteRoutingModule,
        TranslateModule,
        TranslateModule.forRoot(),
        FuseCardModule,
        FlexLayoutModule,
        MatDatepickerModule,
        _materialModule,
        RouterModule,
        MatTabsModule,
        MatChipsModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonToggleModule,
        MaterialFileInputModule,
        MatSortModule,
        MatTooltipModule,
        MatRadioModule,
        DragDropModule,
        SharedModule
    ], providers: [AuthGuard]
})
export class NoteModule {

}
