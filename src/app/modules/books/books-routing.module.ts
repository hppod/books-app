import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { BooksComponent } from "./books.component"

const routes: Routes = [
  {
    path: '',
    component: BooksComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./book-detail/book-detail.module').then(module => module.BookDetailModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
