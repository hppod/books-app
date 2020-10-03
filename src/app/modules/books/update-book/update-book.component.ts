import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Autor } from 'src/app/core/models/autor.model';
import { Livro } from 'src/app/core/models/book.model';
import { AuthorsService } from 'src/app/core/services/authors.service';
import { BooksService } from 'src/app/core/services/books.service';
import { Toastr } from 'src/app/core/services/toastr.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {

  private httpRequest: Subscription

  Book: Livro
  author: Autor
  authorFormGroup: FormGroup
  bookFormGroup: FormGroup
  authors: Autor[]
  isNewAuthor: boolean = false

  constructor(
    private builder: FormBuilder,
    private toastr: Toastr,
    private authorsService: AuthorsService,
    private booksService: BooksService,
    private dialogRef: MatDialogRef<UpdateBookComponent>,
    @Inject(MAT_DIALOG_DATA) data: Livro
  ) {
    this.Book = data['Book']
  }

  ngOnInit(): void {
    this.findAllAuthors()
    this.initializeBookFormGroup()
    this.populateBookFormGroupWithValues()
  }

  findAllAuthors(): void {
    this.httpRequest = this.authorsService.findAllAuthors().subscribe(response => {
      this.authors = response.body['data']
    }, err => {
      this.toastr.showToastrError(`${err.status} - ${err.error['message']}`)
    })
  }

  initializeBookFormGroup(): void {
    this.bookFormGroup = this.builder.group({
      sinopse: this.builder.control(null, [Validators.required]),
      paginas: this.builder.control(null, [Validators.pattern("^[0-9]*$")]),
      imagem: this.builder.control(null, [Validators.required]),
      editora: this.builder.control(null, [Validators.required]),
      autor: this.builder.control(null, [Validators.required]),
      isbn10: this.builder.control(null, [Validators.pattern("^[0-9]*$")]),
      isbn13: this.builder.control(null, [Validators.pattern("^[0-9]*$")])
    })
  }

  populateBookFormGroupWithValues(): void {
    this.bookFormGroup.patchValue({
      sinopse: this.Book['sinopse'],
      paginas: this.Book['paginas'],
      imagem: this.Book['imagem'],
      editora: this.Book['editora'],
      autor: this.Book['autor'],
      isbn10: this.Book['isbn10'],
      isbn13: this.Book['isbn13']
    })
  }

  compareAuthor(a1: Autor, a2: Autor): boolean {
    return a1 && a2 ? a1._id === a2._id : a1 === a2
  }

  closeDialog(b: boolean = false): void {
    this.dialogRef.close(b)
  }

  updateBook(): void {
    this.bookFormGroup.controls['autor'].setValue(this.bookFormGroup.get('autor').value['_id'])
    this.booksService.updateBookById(this.Book['_id'], this.bookFormGroup.value).subscribe(response => {
      this.toastr.showToastrSuccess(`O livro ${this.Book['nome']} foi atualizado com sucesso!`)
      this.closeDialog(true)
    }, err => {
      this.toastr.showToastrError(`${err.status} - ${err.error['message']}`)
      this.closeDialog()
    })
  }

}
