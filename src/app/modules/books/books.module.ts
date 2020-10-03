import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from "@angular/forms"

import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatDialogModule } from "@angular/material/dialog"
import { MatStepperModule } from "@angular/material/stepper"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatIconModule } from "@angular/material/icon"
import { FlexLayoutModule } from "@angular/flex-layout"

import { BooksRoutingModule } from './books-routing.module'
import { BooksComponent } from './books.component';
import { BookCardComponent } from './book-card/book-card.component';
import { BookDetailComponent } from './book-detail/book-detail.component'
import { ComponentsModule } from "./../../components/components.module";
import { NewBookComponent } from './new-book/new-book.component';
import { UpdateBookComponent } from './update-book/update-book.component'

@NgModule({
  declarations: [
    BooksComponent,
    BookCardComponent,
    BookDetailComponent,
    NewBookComponent,
    UpdateBookComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BooksRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    FlexLayoutModule,
    ComponentsModule
  ],
  exports: [
    BookCardComponent
  ]
})
export class BooksModule { }
