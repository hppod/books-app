import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { MatDialog } from "@angular/material/dialog"
import { Livro } from './../../core/models/book.model'
import { BooksService } from './../../core/services/books.service'
import { NewBookComponent } from "./new-book/new-book.component"

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription

  books: Livro[]
  hasError: boolean = false

  constructor(
    private booksService: BooksService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.findAllBooks()
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  findAllBooks(): void {
    this.httpRequest = this.booksService.findAllBooks().subscribe(response => {
      this.books = response.body['data']
    }, err => {
      this.hasError = true
    })
  }

  openNewBookModal(): void {
    const dialogRef = this.dialog.open(NewBookComponent, {
      disableClose: true,
      width: '600px',
      height: '600px',
    })

    dialogRef.afterClosed().subscribe(newBookAdded => {
      if (newBookAdded) {
        this.books = undefined
        this.findAllBooks()
      }
    })
  }

}
