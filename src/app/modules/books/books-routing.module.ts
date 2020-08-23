import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { BooksComponent } from "./books.component"
import { BookDetailComponent } from "./book-detail/book-detail.component"

const routes: Routes = [
  {
    path: '',
    component: BooksComponent
  },
  {
    path: 'detail/:bookName',
    component: BookDetailComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
