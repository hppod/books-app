import { Livro } from "./book.model"

export interface Autor {
    _id: String
    nome: String
    biografia?: String
    imagem?: String,
    livros?: Livro[]
}