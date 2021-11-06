import {CategoryModel} from "../../category/models/category.model";
import {IDateHolderResponseBody} from "../../../core/models/request";

export interface NoteModel extends IDateHolderResponseBody {
    id: number;
    title: string;
    content: string;
    category: CategoryModel;
}
