import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthorsService } from 'src/app/core/services/authors.service';
import { Toastr } from 'src/app/core/services/toastr.service';

@Component({
  selector: 'app-new-author',
  templateUrl: './new-author.component.html',
  styleUrls: ['./new-author.component.css']
})
export class NewAuthorComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription

  authorFormGroup: FormGroup

  constructor(
    private builder: FormBuilder,
    private toastr: Toastr,
    private authorsService: AuthorsService
  ) { }

  ngOnInit(): void {
    this.initializeAuthorForm()
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  initializeAuthorForm(): void {
    this.authorFormGroup = this.builder.group({
      nome: this.builder.control(null, [Validators.required, Validators.maxLength(200)]),
      biografia: this.builder.control(null),
      imagem: this.builder.control(null)
    })
  }

  createNewAuthor(): void {
    this.authorsService.createNewAuthor(this.authorFormGroup.value).subscribe(response => {
      this.toastr.showToastrSuccess(`O autor ${response.body['data']['nome']} foi adicionado com sucesso!`)
    }, err => {
      this.toastr.showToastrError(`${err.status} - ${err.error['message']}`)
    })
  }

}
