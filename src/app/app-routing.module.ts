import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

const routes: Routes = [
    {
        path: 'books',
        loadChildren: () => import('./modules/books/books.module').then(module => module.BooksModule)
    },
    {
        path: '',
        redirectTo: '/books',
        pathMatch: 'full'
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }