import { Injectable } from "@angular/core"
import { AsyncValidatorFn } from "@angular/forms"
import { map, debounceTime, distinctUntilChanged, switchMap, first } from "rxjs/operators"
import { BooksService } from "./../services/books.service"

@Injectable({
    providedIn: 'root'
})
export class BookValidator {
    constructor(private service: BooksService) { }

    validatorUniqueBookName(): AsyncValidatorFn {
        return control => control.valueChanges
            .pipe(
                debounceTime(400),
                distinctUntilChanged(),
                switchMap(value => this.service.validatorUniqueBookName(value)),
                map((response) => {
                    if (response['data'] == 0 && control.value != null && control.value != '') {
                        return null
                    } else {
                        return { 'bookNameAlreadyExists': true }
                    }
                }),
                first()
            )
    }
}