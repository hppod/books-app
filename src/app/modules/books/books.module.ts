import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatGridListModule } from "@angular/material/grid-list"
import { FlexLayoutModule } from "@angular/flex-layout"

import { BooksRoutingModule } from './books-routing.module'
import { BooksComponent } from './books.component'


@NgModule({
  declarations: [BooksComponent],
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
