import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Autor } from "./../models/autor.model"
import { API_URL } from "./../api"

@Injectable({
    providedIn: 'root'
})
export class AuthorsService {

    constructor(private http: HttpClient) { }

    findAllAuthors(): Observable<HttpResponse<Autor[]>> {
        return this.http.get<Autor[]>(`${API_URL}/autor/listarTodos`, { observe: 'response' })
    }

    createNewAuthor(body: Autor): Observable<HttpResponse<Autor>> {
        return this.http.post<Autor>(`${API_URL}/autor/criar`, body, { observe: 'response' })
    }

    validatorUniqueAuthorName(authorName: string) {
        let params = new HttpParams()
        params = params.append('nome', authorName)
        return this.http.get<any>(`${API_URL}/autor/validarNomeAutor`, { params: params })
    }

}
