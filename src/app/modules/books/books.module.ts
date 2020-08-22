import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MatSidenavModule } from "@angular/material/sidenav"

import { BooksRoutingModule } from './books-routing.module'
import { BooksComponent } from './books.component'


@NgModule({
  declarations: [BooksComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MatSidenavModule
  ]
})
export class BooksModule { }
