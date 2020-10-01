import { Component, OnInit, Input } from '@angular/core'
import { Livro } from './../../../core/models/book.model'

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {

  @Input() Book: Livro
  @Input() showHeader: boolean = true
  @Input() showSynopsis: boolean = true

  constructor() { }

  ngOnInit(): void {
  }

  sliceSynopsis(value: String): String {
    return `${value.slice(0, 100)}...`
  }

}
