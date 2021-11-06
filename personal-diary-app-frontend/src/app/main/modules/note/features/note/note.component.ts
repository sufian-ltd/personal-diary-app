import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {DEFAULT_PAGE, DEFAULT_SIZE} from '../../../../core/constants/constant';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {FuseTranslationLoaderService} from '../../../../core/services/translation-loader.service';
import {NoteService} from '../../services/note.service';
import {UnsubscribeAdapterComponent} from '../../../../core/helper/unsubscribeAdapter';
import {SnackbarHelper} from '../../../../core/helper/snackbar.helper';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ConfirmDialogConstant} from '../../../../shared/constant/confirm.dialog.constant';
import {SubmitConfirmationDialogComponent} from '../../../../shared/components/submit-confirmation-dialog/submit-confirmation-dialog.component';
import {NoteModel} from "../../models/note.model";
import {ActivatedRoute} from "@angular/router";
import {CategoryService} from "../../../category/services/category.service";
import {CategoryModel} from "../../../category/models/category.model";

@Component({
    selector: 'app-category',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.scss']
})
export class NoteComponent extends UnsubscribeAdapterComponent implements OnInit {

    formGroup: FormGroup;
    displayedColumns: string[] = ['sl', 'category', 'title', 'content', 'createdOn', 'updatedOn', 'action'];
    dataSource: MatTableDataSource<NoteModel>;
    total: number;
    disableDelete: boolean;
    size: number = DEFAULT_SIZE;
    page: number = DEFAULT_PAGE;

    categoryList: CategoryModel[] = [];
    categoryId: number;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private _fuseTranslationLoaderService: FuseTranslationLoaderService,
                private service: NoteService, private snackbarHelper: SnackbarHelper,
                private _activatedRoute: ActivatedRoute, private categoryService: CategoryService,
                private dialog: MatDialog
    ) {
        super();
    }

    ngOnInit(): void {
        if (this._activatedRoute.snapshot.paramMap.get('id')) {
            this.categoryId = Number(this._activatedRoute.snapshot.paramMap.get('id'));
        }
        this.getAllNotes();
        this.populateForm();
        this.getCategoryList();
    }

    private getAllNotes() {
        this.categoryId ? this.getNoteListByCategory() : this.getNoteList();
    }

    private populateForm() {
        this.formGroup = new FormGroup({
            id: new FormControl(''),
            category: new FormControl('', [Validators.required]),
            title: new FormControl('', [Validators.required]),
            content: new FormControl('', [Validators.required]),
            createdOn: new FormControl('')
        });
    }

    onSubmit() {
        let noteModel: NoteModel = this.formGroup.value;
        noteModel.category = this.categoryList.find(e => e.id === this.formGroup.value.category);
        (this.formGroup.value.id) ? this.update(noteModel) : this.create(noteModel);
    }

    private getCategoryList() {
        this.subscribe$.add(
            this.categoryService.getList().subscribe(res => {
                this.categoryList = res;
                if(this.categoryId) {
                    this.formGroup.patchValue({category: this.categoryId});
                }
            })
        );
    }

    private getNoteListByCategory() {
        this.subscribe$.add(
            this.service.getNoteListByCategoryWithPagination(this.categoryId, this.page, this.size).subscribe(res => {
                this.dataSource = new MatTableDataSource(res.content);
                this.total = res.totalElements;
            })
        );
    }

    private getNoteList() {
        this.subscribe$.add(
            this.service.getListWithPagination(this.page, this.size).subscribe(res => {
                this.dataSource = new MatTableDataSource(res.content);
                this.total = res.totalElements;
            })
        );
    }

    private create(noteModel: NoteModel) {
        this.subscribe$.add(
            this.service.create(noteModel).subscribe(res => {
                if (res.id) {
                    this.snackbarHelper.openSuccessSnackBar();
                    this.getAllNotes();
                    this.reset();
                } else {
                    this.snackbarHelper.openErrorSnackBar();
                }
            })
        );
    }

    private update(noteModel: NoteModel) {
        this.subscribe$.add(
            this.service.update(noteModel).subscribe(res => {
                if (res.id) {
                    this.snackbarHelper.openSuccessSnackBarWithMessage('Successfully Data Updated', 'OK');
                    this.getAllNotes();
                    this.reset();
                } else {
                    this.snackbarHelper.openErrorSnackBar();
                }
            })
        );
    }

    edit(row: NoteModel) {
        console.log(row);
        this.disableDelete = true;
        this.formGroup.patchValue({
            id: row.id,
            title: row.title,
            content: row.content,
            category: row.category.id,
            createdOn: row.createdOn
        });
    }

    delete(row: NoteModel) {
        this.subscribe$.add(
            this.service.deleteById(row.id).subscribe(res => {
                if (res) {
                    this.snackbarHelper.openSuccessSnackBarWithMessage('Successfully Data Deleted', 'OK');
                    this.getAllNotes();
                    this.reset();
                }
            })
        );
    }

    reset() {
        this.disableDelete = false;
        this.formGroup.reset();
        this.formGroup.patchValue({
            category: ''
        })
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    onChangePage(event: PageEvent) {
        this.size = +event.pageSize;
        this.page = +event.pageIndex;
        this.getAllNotes();
    }

    private openDialog(row: NoteModel) {
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
