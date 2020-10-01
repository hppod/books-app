import { Component, Input, OnInit } from '@angular/core'
import { Autor } from 'src/app/core/models/autor.model'

@Component({
  selector: 'app-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.css']
})
export class AuthorCardComponent implements OnInit {

  @Input() Author: Autor

  constructor() { }

  ngOnInit(): void {
  }

  sliceBiography(value: String): String {
    return `${value.slice(0, 100)}`
  }

}
