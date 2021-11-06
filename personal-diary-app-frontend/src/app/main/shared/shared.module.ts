import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TranslateModule} from '@ngx-translate/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {SubmitConfirmationDialogComponent} from './components/submit-confirmation-dialog/submit-confirmation-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectSearchComponent} from './components/mat-select-search/mat-select-search.component';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CKEditorModule} from 'ng2-ckeditor';
import {NumberDirective} from './directives/numbers-only.directive';
import {MonthNamePipe} from './pipes/month-name.pipe';
import {NumberPipe} from './pipes/number-pipe.pipe';
import {DateBengaliPipe} from './pipes/date-bengali-pipe';
import { RouterModule } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';

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
    MatTooltipModule,
    MatExpansionModule,
    MatListModule,
    MatDialogModule,
    MatRadioModule

];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        _materialModule,
        FlexLayoutModule,
        MatTooltipModule,
        TranslateModule,
        NgxMatSelectSearchModule,
        MatProgressSpinnerModule,
        CKEditorModule,
        RouterModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectSearchComponent,
        NumberDirective,
        NumberPipe,
        MonthNamePipe,
        DateBengaliPipe
    ],
    declarations: [
        SubmitConfirmationDialogComponent,
        MatSelectSearchComponent,
        NumberPipe,
        MonthNamePipe,
        NumberDirective,
        DateBengaliPipe,
    ],
    providers: [
        NumberPipe,
        MonthNamePipe,
        DateBengaliPipe
    ]

})
export class SharedModule {
}
