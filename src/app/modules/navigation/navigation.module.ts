import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { MatSidenavModule } from "@angular/material/sidenav"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { MatListModule } from "@angular/material/list"

import { NavigationComponent } from './navigation.component'

@NgModule({
  declarations: [NavigationComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule
  ],
  exports: [NavigationComponent]
})
export class NavigationModule { }
