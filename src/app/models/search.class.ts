import { Category } from "./category.interface";

export class Search {
    searchText: string = '';
    category: Category = {id: 1, Nome: 'Todos', selected: true, color: 'primary'};
}