import { Observable } from "rxjs";
import { Product } from "../../models/product.class";

export interface IProductService {
    getAll(): Observable<Product[]>;
    getByName(name: string): Observable<Product[]>;
    getById(id: number): Observable<Product>;
}