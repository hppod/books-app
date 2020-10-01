import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { Autor } from 'src/app/core/models/autor.model'
import { AuthorsService } from 'src/app/core/services/authors.service'
import { Toastr } from 'src/app/core/services/toastr.service'

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.css']
})
export class AuthorDetailComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription

  Author: Autor

  constructor(
    private activatedRoute: ActivatedRoute,
    private authorsService: AuthorsService,
    private toastr: Toastr
  ) { }

  ngOnInit(): void {
    const authorName: String = this.activatedRoute.snapshot.params['authorName']
    this.findAuthorByName(authorName)
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  findAuthorByName(authorName: String): void {
    this.httpRequest = this.authorsService.findAuthorByName(authorName).subscribe(response => {
      this.Author = response.body['data']
    }, err => {
      this.toastr.showToastrError(`${err.status} - ${err.error['message']}`)
    })
  }

  countBooksOnBookCase(nBooks: Number): String {
    return nBooks > 1 ? `${nBooks} livros na sua estante` : `${nBooks} livro na sua estante`
  }

  titleBooksOnBookCase(nBooks: Number): String {
    if (nBooks > 1) {
      return 'Livros do autor na sua estante'
    } else if (nBooks == 1) {
      return 'Livro do autor na sua estante'
    } else {
      return 'Não há livros deste autor na sua estante'
    }
  }

}
