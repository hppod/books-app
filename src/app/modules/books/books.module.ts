import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatGridListModule } from "@angular/material/grid-list"
import { FlexLayoutModule } from "@angular/flex-layout"

import { BooksRoutingModule } from './books-routing.module'
import { BooksComponent } from './books.component';
import { BookCardComponent } from './book-card/book-card.component';
import { BookDetailComponent } from './book-detail/book-detail.component'


@NgModule({
  declarations: [
    BooksComponent,
    BookCardComponent,
    BookDetailComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    FlexLayoutModule
  ]
})
export class BooksModule { }
