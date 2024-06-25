import { Category } from "./category.interface";

export class Product {
    id: number;
    Nome: string;
    idCategory?: number;
    Descricao: string;
    Preco: number;
    Imagem: string;
    Marca: string;
    Condicao: string;

    constructor(){
        this.id = 0;
        this.Nome = '';
        this.Descricao = '';
        this.Preco = 0.0;
        this.Imagem = '';
        this.Marca = '';
        this.Condicao = '';
    }
}