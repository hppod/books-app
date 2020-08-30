import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from "@angular/router"
import { Subscription } from "rxjs"
import { Livro } from "./../../../core/models/book.model"
import { BooksService } from "./../../../core/services/books.service"

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription

  Book: Livro
  hasError: boolean = false

  constructor(
    private activatedRoute: ActivatedRoute,
    private booksService: BooksService
  ) { }

  ngOnInit(): void {
    const bookName = this.activatedRoute.snapshot.params['bookName']

    this.findBookByName(bookName)
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  findBookByName(bookName: String): void {
    this.httpRequest = this.booksService.findBookByName(bookName).subscribe(response => {
      this.Book = response.body['data']
    }, err => {
      this.hasError = true
    })
  }

}
