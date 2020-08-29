import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http'
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

  createNewBook(body: Livro): Observable<HttpResponse<Livro>> {
    return this.http.post<Livro>(`${API_URL}/livro/criar`, body, { observe: 'response' })
  }

  validatorUniqueBookName(bookName: string) {
    let params = new HttpParams()
    params = params.append('nome', bookName)
    return this.http.get<any>(`${API_URL}/livro/validarNomeLivro`, { params: params })
  }

}
