import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Livro } from './../models/book.model'
import { API_URL } from "./../api"

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  findAllBooks(): Observable<HttpResponse<Livro[]>> {
    return this.http.get<Livro[]>(`${API_URL}/livro/listarTodos`, { observe: 'response' })
  }

  findBookByName(bookName: String): Observable<HttpResponse<Livro>> {
    return this.http.get<Livro>(`${API_URL}/livro/listarUm/${bookName}`, { observe: 'response' })
  }

}
