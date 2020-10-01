import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from "@angular/forms"

import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { FlexLayoutModule } from "@angular/flex-layout"

import { AuthorsRoutingModule } from './authors-routing.module'
import { AuthorsComponent } from './authors.component'
import { ComponentsModule } from "./../../components/components.module";
import { AuthorCardComponent } from './author-card/author-card.component'

@NgModule({
  declarations: [
    AuthorsComponent,
    AuthorCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthorsRoutingModule,
    ComponentsModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule
  ]
})
export class AuthorsModule { }
