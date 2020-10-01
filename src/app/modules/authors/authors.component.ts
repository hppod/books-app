import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Autor } from 'src/app/core/models/autor.model';
import { AuthorsService } from 'src/app/core/services/authors.service';
import { Toastr } from 'src/app/core/services/toastr.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription

  authors: Autor[]

  constructor(
    private authorsService: AuthorsService,
    private toastr: Toastr
  ) { }

  ngOnInit(): void {
    this.findAllAuthors()
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  findAllAuthors(): void {
    this.httpRequest = this.authorsService.findAllAuthors().subscribe(response => {
      this.authors = response.body['data']
    }, err => {
      this.toastr.showToastrError(`${err.status} - ${err.error['message']}`)
    })
  }

  openNewAuthorModal(): void {

  }

}
