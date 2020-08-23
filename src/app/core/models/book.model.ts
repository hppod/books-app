import { Autor } from "./autor.model"

export interface Livro {
    _id: String
    nome: String
    sinopse: String
    paginas?: Number
    imagem: String
    editora: String
    autor: Autor,
    isbn10?: String,
    isbn13?: String
}