import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({ providedIn: 'root'})
export class LayoutHelperService {

    private subject = new Subject<'bn' | 'en'>();

    setLanguageEvent(lan: 'bn' | 'en'){
        this.subject.next(lan);
    }

    getLanguageEvent():Observable<'bn' | 'en'>{
        return this.subject.asObservable();
    }
}
