import { Component, OnInit, OnDestroy } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ActivatedRoute, Params, Router } from "@angular/router"
import { Subscription } from "rxjs"
import { ConfirmComponent } from 'src/app/components/confirm/confirm.component'
import { Toastr } from 'src/app/core/services/toastr.service'
import { UpdateBookComponent } from '../update-book/update-book.component'
import { Livro } from "./../../../core/models/book.model"
import { BooksService } from "./../../../core/services/books.service"

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription
  bookName: Params
  Book: Livro
  hasError: boolean = false

  constructor(
    private activatedRoute: ActivatedRoute,
    private booksService: BooksService,
    public dialog: MatDialog,
    private toastr: Toastr,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.bookName = this.activatedRoute.snapshot.params['bookName']

    this.findBookByName(this.bookName)
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  findBookByName(bookName: Params): void {
    this.httpRequest = this.booksService.findBookByName(bookName.toString()).subscribe(response => {
      this.Book = response.body['data']
    }, err => {
      this.hasError = true
    })
  }

  openUpdateBookModal(): void {
    const dialogRef = this.dialog.open(UpdateBookComponent, {
      disableClose: true,
      width: '600px',
      height: '600px',
      data: { Book: this.Book }
    })

    dialogRef.afterClosed().subscribe(bookUpdated => {
      if (bookUpdated) {
        this.Book = undefined
        this.findBookByName(this.bookName)
      }
    })
  }

  confirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: true,
      width: '600px',
      height: '160px',
      data: { message: `Deseja apagar o livro ${this.Book['nome']}?` }
    })

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.deleteBook(this.Book['_id'])
      }
    })
  }

  deleteBook(bookId: String): void {
    this.httpRequest = this.booksService.deleteBookById(bookId).subscribe(response => {
      this.toastr.showToastrSuccess(`O livro ${this.Book['nome']} foi apagado com sucesso!`)
      this.route.navigate(['/books'])
    }, err => {
      this.toastr.showToastrError(`${err.status} - ${err.error['message']}`)
    })
  }

}
