import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthorsService } from 'src/app/core/services/authors.service';
import { Toastr } from 'src/app/core/services/toastr.service';
import { AuthorValidator } from 'src/app/core/validators/author.validator';

@Component({
  selector: 'app-new-author',
  templateUrl: './new-author.component.html',
  styleUrls: ['./new-author.component.css']
})
export class NewAuthorComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription

  authorFormGroup: FormGroup

  @ViewChild('autosize') autosize: CdkTextareaAutosize

  constructor(
    private builder: FormBuilder,
    private toastr: Toastr,
    private authorsService: AuthorsService,
    private authorValidator: AuthorValidator,
    private dialogRef: MatDialogRef<NewAuthorComponent>,
  ) { }

  ngOnInit(): void {
    this.initializeAuthorForm()
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  initializeAuthorForm(): void {
    this.authorFormGroup = this.builder.group({
      nome: this.builder.control(null, [Validators.required, Validators.maxLength(200)], this.authorValidator.validatorUniqueAuthorName()),
      biografia: this.builder.control(null),
      imagem: this.builder.control(null)
    })
  }

  createNewAuthor(): void {
    this.httpRequest = this.authorsService.createNewAuthor(this.authorFormGroup.value).subscribe(response => {
      this.toastr.showToastrSuccess(`O autor ${response.body['data']['nome']} foi adicionado com sucesso!`)
      this.closeDialog(true)
    }, err => {
      this.toastr.showToastrError(`${err.status} - ${err.error['message']}`)
      this.closeDialog()
    })
  }

  closeDialog(b: boolean = false): void {
    this.dialogRef.close(b)
  }

  authorNameExists(): boolean {
    return this.authorFormGroup.get('nome').hasError('authorNameAlreadyExists')
  }

}
