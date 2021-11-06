import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {DEFAULT_PAGE, DEFAULT_SIZE} from '../../../../core/constants/constant';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {FuseTranslationLoaderService} from '../../../../core/services/translation-loader.service';
import {CategoryService} from '../../services/category.service';
import {UnsubscribeAdapterComponent} from '../../../../core/helper/unsubscribeAdapter';
import {SnackbarHelper} from '../../../../core/helper/snackbar.helper';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ConfirmDialogConstant} from '../../../../shared/constant/confirm.dialog.constant';
import {SubmitConfirmationDialogComponent} from '../../../../shared/components/submit-confirmation-dialog/submit-confirmation-dialog.component';
import {CategoryModel} from "../../models/category.model";

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent extends UnsubscribeAdapterComponent implements OnInit {

    formGroup: FormGroup;
    displayedColumns: string[] = ['sl', 'name', 'createdOn', 'updatedOn', 'action'];
    dataSource: MatTableDataSource<CategoryModel>;
    total: number;
    disableDelete: boolean;
    size: number = DEFAULT_SIZE;
    page: number = DEFAULT_PAGE;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private _fuseTranslationLoaderService: FuseTranslationLoaderService,
                private service: CategoryService, private snackbarHelper: SnackbarHelper,
                private dialog: MatDialog
    ) {
        super();
    }

    ngOnInit(): void {
        this.populateForm();
        this.getCategoryList();
    }

    private populateForm() {
        this.formGroup = new FormGroup({
            id: new FormControl(''),
            name: new FormControl('', [Validators.required]),
            createdOn: new FormControl('')
        });
    }

    onSubmit() {
        (this.formGroup.value.uuid) ? this.update() : this.create();
    }

    private getCategoryList() {
        this.subscribe$.add(
            this.service.getListWithPagination(this.page, this.size).subscribe(res => {
                this.dataSource = new MatTableDataSource(res.content);
                this.total = res.totalElements;
            })
        );
    }

    private create() {
        this.subscribe$.add(
            this.service.create(this.formGroup.value).subscribe(res => {
                if (res.id) {
                    this.snackbarHelper.openSuccessSnackBar();
                    this.getCategoryList();
                    this.reset();
                } else {
                    this.snackbarHelper.openErrorSnackBar();
                }
            })
        );
    }

    private update() {
        this.subscribe$.add(
            this.service.update(this.formGroup.value).subscribe(res => {
                if (res.id) {
                    this.snackbarHelper.openSuccessSnackBarWithMessage('Successfully Data Updated', 'OK');
                    this.getCategoryList();
                    this.reset();
                } else {
                    this.snackbarHelper.openErrorSnackBar();
                }
            })
        );
    }

    edit(row: CategoryModel) {
        this.disableDelete = true;
        this.formGroup.patchValue({
            id: row.id,
            name: row.name,
            createdOn: row.createdOn
        });
    }

    delete(row: CategoryModel) {
        this.subscribe$.add(
            this.service.deleteById(row.id).subscribe(res => {
                if (res) {
                    this.snackbarHelper.openSuccessSnackBarWithMessage('Successfully Data Deleted', 'OK');
                    this.getCategoryList();
                    this.reset();
                }
            })
        );
    }

    private reset() {
        this.disableDelete = false;
        this.formGroup.reset();
        this.formGroup.patchValue({
            status: 'true'
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    onChangePage(event: PageEvent) {
        this.size = +event.pageSize; // get the pageSize
        this.page = +event.pageIndex; // get the current page
        this.getCategoryList();
    }

    private openDialog(row: CategoryModel) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = false;
        dialogConfig.width = ConfirmDialogConstant.WIDTH;
        dialogConfig.height = ConfirmDialogConstant.HEIGHT;
        dialogConfig.panelClass = ConfirmDialogConstant.PANEL_CLASS;
        dialogConfig.data = {message: ConfirmDialogConstant.MESSAGE};
        const dialogRef = this.dialog.open(SubmitConfirmationDialogComponent, dialogConfig);

        dialogRef.componentInstance.closeEventEmitter.subscribe(res => {
            if (res) {
                this.delete(row);
                dialogRef.close(true);
            } else {
                dialogRef.close(true);
            }
        });
    }

}
