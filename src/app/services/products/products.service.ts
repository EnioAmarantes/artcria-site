import { Injectable } from '@angular/core';
import { Product } from '../../models/product.class';
import { PRODUCT_LIST } from './products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Product[] = PRODUCT_LIST;
  constructor() { }
  
  getAll(): Product[] {
    return this.products;
  }
  
  getById(id: number): Product | undefined {
    return this.products.find(product => product.id == id);
  }

  getByName(searchText: string): Product[] {
    return this.products.filter(p => 
      p.Nome.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
  }
}
