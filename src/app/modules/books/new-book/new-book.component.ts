import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { Subscription } from "rxjs"
import { Autor } from './../../../core/models/autor.model'
import { Toastr } from "./../../../core/services/toastr.service"
import { AuthorsService } from "./../../../core/services/authors.service"
import { BooksService } from "./../../../core/services/books.service"

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription

  authorFormGroup: FormGroup
  bookFormGroup: FormGroup

  newAuthorForm: boolean = false
  indexOfAuthorSelected: number
  stepAuthorLabel: String = 'Autor'
  authors: Autor[]

  isNewAuthor: boolean = false

  constructor(
    private builder: FormBuilder,
    private toastr: Toastr,
    private authorsService: AuthorsService,
    private booksService: BooksService
  ) { }

  ngOnInit(): void {
    this.findAllAuthors()
    this.initiliazeForms()
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

  initiliazeForms(): void {
    this.authorFormGroup = this.builder.group({
      nome: this.builder.control(null, [Validators.required, Validators.maxLength(200)]),
      biografia: this.builder.control(null),
      imagem: this.builder.control(null)
    })

    this.bookFormGroup = this.builder.group({
      nome: this.builder.control(null, [Validators.required]),
      sinopse: this.builder.control(null, [Validators.required]),
      paginas: this.builder.control(null),
      imagem: this.builder.control(null, [Validators.required]),
      editora: this.builder.control(null, [Validators.required]),
      autor: this.builder.control(null, [Validators.required]),
      isbn10: this.builder.control(null),
      isbn13: this.builder.control(null)
    })
  }

  setAuthor($event: any): void {
    this.indexOfAuthorSelected = $event.value
    this.authorFormGroup.controls['nome'].setValue(this.authors[this.indexOfAuthorSelected].nome)
  }

  newAuthor(): void {
    this.indexOfAuthorSelected = null
    this.isNewAuthor = true
    this.newAuthorForm = !this.newAuthorForm
    this.authorFormGroup.controls['nome'].setValue(null)
  }

  selectAuthor(): void {
    this.indexOfAuthorSelected = null
    this.isNewAuthor = false
    this.newAuthorForm = !this.newAuthorForm
  }

  nextStep() {
    if (this.isNewAuthor) {
      this.createNewAuthor(this.authorFormGroup.value)
    } else {
      this.bookFormGroup.controls['autor'].setValue(this.authors[this.indexOfAuthorSelected]._id)
      this.stepAuthorLabel = `Autor: ${this.authors[this.indexOfAuthorSelected].nome}`
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

}
