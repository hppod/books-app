import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AuthorsComponent } from "./authors.component"
import { AuthorDetailComponent } from "./author-detail/author-detail.component"

const routes: Routes = [
  {
    path: '',
    component: AuthorsComponent
  },
  {
    path: 'detail/:authorName',
    component: AuthorDetailComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorsRoutingModule { }
