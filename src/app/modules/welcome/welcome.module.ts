import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"

import { WelcomeRoutingModule } from './welcome-routing.module'
import { WelcomeComponent } from './welcome.component'


@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class WelcomeModule { }
