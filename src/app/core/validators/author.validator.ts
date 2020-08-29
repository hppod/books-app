import { Injectable } from "@angular/core"
import { AsyncValidatorFn } from "@angular/forms"
import { map, debounceTime, distinctUntilChanged, switchMap, first } from "rxjs/operators"
import { AuthorsService } from "./../services/authors.service"

@Injectable({
    providedIn: 'root'
})
export class AuthorValidator {
    constructor(private service: AuthorsService) { }

    validatorUniqueAuthorName(): AsyncValidatorFn {
        return control => control.valueChanges
            .pipe(
                debounceTime(400),
                distinctUntilChanged(),
                switchMap(value => this.service.validatorUniqueAuthorName(value)),
                map((response) => {
                    if (response['data'] == 0 && control.value != null && control.value != '') {
                        return null
                    } else {
                        return { 'authorNameAlreadyExists': true }
                    }
                }),
                first()
            )
    }
}