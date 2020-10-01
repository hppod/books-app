import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { Subscription } from "rxjs"
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Autor } from './../../../core/models/autor.model'
import { Toastr } from "./../../../core/services/toastr.service"
import { AuthorsService } from "./../../../core/services/authors.service"
import { BooksService } from "./../../../core/services/books.service"
import { BookValidator } from "./../../../core/validators/book.validator"
import { AuthorValidator } from "./../../../core/validators/author.validator"

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription

  authorFormGroup: FormGroup
  bookFormGroup: FormGroup
  stepAuthorLabel: String = 'Autor'
  authors: Autor[]
  isNewAuthor: boolean = false

  @ViewChild('autosize') autosize: CdkTextareaAutosize

  constructor(
    private builder: FormBuilder,
    private toastr: Toastr,
    private authorsService: AuthorsService,
    private booksService: BooksService,
    private authorValidator: AuthorValidator,
    private bookValidator: BookValidator
  ) { }

  ngOnInit(): void {
    this.findAllAuthors()
    this.initializeBookFormGroup()
    this.initializeSelectAuthorFormGroup()
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  findAllAuthors(): void {
    this.httpRequest = this.authorsService.findAllAuthors().subscribe(response => {
      this.authors = response.body['data']
    }, err => {
      this.toastr.showToastrError(`${err.status} - ${err.error['message']}`)
    })
  }

  initializeSelectAuthorFormGroup() {
    this.authorFormGroup = this.builder.group({
      autor: this.builder.control(null, [Validators.required])
    })
  }

  initializeNewAuthorFormGroup() {
    this.authorFormGroup = this.builder.group({
      nome: this.builder.control(null, [Validators.required, Validators.maxLength(200)], this.authorValidator.validatorUniqueAuthorName()),
      biografia: this.builder.control(null),
      imagem: this.builder.control(null)
    })
  }

  initializeBookFormGroup(): void {
    this.bookFormGroup = this.builder.group({
      nome: this.builder.control(null, [Validators.required], this.bookValidator.validatorUniqueBookName()),
      sinopse: this.builder.control(null, [Validators.required]),
      paginas: this.builder.control(null),
      imagem: this.builder.control(null, [Validators.required]),
      editora: this.builder.control(null, [Validators.required]),
      autor: this.builder.control(null, [Validators.required]),
      isbn10: this.builder.control(null),
      isbn13: this.builder.control(null)
    })
  }

  newAuthor(): void {
    this.isNewAuthor = !this.isNewAuthor
    this.initializeNewAuthorFormGroup()
  }

  selectAuthor(): void {
    this.isNewAuthor = !this.isNewAuthor
    this.initializeSelectAuthorFormGroup()
  }

  nextStep() {
    if (this.isNewAuthor) {
      this.createNewAuthor(this.authorFormGroup.value)
    } else {
      this.bookFormGroup.controls['autor'].setValue(this.authorFormGroup.value['autor']['_id'])
      this.stepAuthorLabel = `Autor: ${this.authorFormGroup.value['autor']['nome']}`
    }
  }

  createNewAuthor(dataAuthor: Autor): void {
    this.authorsService.createNewAuthor(dataAuthor).subscribe(response => {
      this.bookFormGroup.controls['autor'].setValue(response.body['data']['_id'])
      this.stepAuthorLabel = `Autor: ${response.body['data']['nome']}`
      this.toastr.showToastrSuccess(`O autor ${response.body['data']['nome']} foi adicionado com sucesso!`)
    }, err => {
      this.toastr.showToastrError(`${err.status} - ${err.error['message']}`)
    })
  }

  createNewBook(): void {
    this.booksService.createNewBook(this.bookFormGroup.value).subscribe(response => {
      this.toastr.showToastrSuccess(`O livro ${response.body['data']['nome']} foi adicionado com sucesso!`)
    }, err => {
      this.toastr.showToastrError(`${err.status} - ${err.error['message']}`)
    })
  }

  authorNameExists(): boolean {
    return this.authorFormGroup.get('nome').hasError('authorNameAlreadyExists')
  }

  bookNameExists(): boolean {
    return this.bookFormGroup.get('nome').hasError('bookNameAlreadyExists')
  }

}
