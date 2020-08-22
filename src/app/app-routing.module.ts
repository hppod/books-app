import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

const routes: Routes = [
    {
        path: 'welcome',
        loadChildren: () => import('./modules/welcome/welcome.module').then(module => module.WelcomeModule)
    },
    {
        path: 'books',
        loadChildren: () => import('./modules/books/books.module').then(module => module.BooksModule)
    },
    {
        path: '',
        redirectTo: '/welcome',
        pathMatch: 'full'
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }