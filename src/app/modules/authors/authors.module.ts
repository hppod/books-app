import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from "@angular/forms"

import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatDialogModule } from "@angular/material/dialog"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { FlexLayoutModule } from "@angular/flex-layout"

import { AuthorsRoutingModule } from './authors-routing.module'
import { AuthorsComponent } from './authors.component'
import { ComponentsModule } from "./../../components/components.module";
import { AuthorCardComponent } from './author-card/author-card.component';
import { AuthorDetailComponent } from './author-detail/author-detail.component'
import { BooksModule } from '../books/books.module';
import { NewAuthorComponent } from './new-author/new-author.component'

@NgModule({
  declarations: [
    AuthorsComponent,
    AuthorCardComponent,
    AuthorDetailComponent,
    NewAuthorComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthorsRoutingModule,
    ComponentsModule,
    BooksModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule
  ]
})
export class AuthorsModule { }
