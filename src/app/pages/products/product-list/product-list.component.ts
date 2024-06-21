import { Component } from '@angular/core';
import { Product } from '../../../models/product.class';
import { PRODUCT_LIST } from '../../../services/products/products';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductsService } from '../../../services/products/products.service';
import { SearchbarComponent } from '../../../components/searchbar/searchbar.component';
import { Search } from '../../../models/search.class';
import { Category } from '../../../models/category.interface';
import { NgIf } from '@angular/common';
import { NoProductsMessageComponent } from '../no-products-message/no-products-message.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ ProductCardComponent, SearchbarComponent, NoProductsMessageComponent ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products: Product[];
  filteredProducts: Product[];
  
  constructor(private productsService : ProductsService){
    this.filteredProducts = this.products = productsService.getAll();
  }

  Pesquisar(search: Search){
    this.products = this.productsService.getByName(search.searchText);
    this.FiltrarCategoria(search.category);
  }

  FiltrarCategoria(category: Category){
    if(category.id == 1 && category.Nome == 'Todos')
      this.filteredProducts = this.products;
    else 
      this.filteredProducts = this.products.filter(p => p.idCategory == category.id);
  }
}
