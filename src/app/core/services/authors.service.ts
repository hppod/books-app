import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse } from '@angular/common/http'
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

}
