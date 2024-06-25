import { Component, Inject } from '@angular/core';
import { Product } from '../../../models/product.class';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SearchbarComponent } from '../../../components/searchbar/searchbar.component';
import { Search } from '../../../models/search.class';
import { Category } from '../../../models/category.interface';
import { NoProductsMessageComponent } from '../no-products-message/no-products-message.component';
import { IProductService } from '../../../services/interfaces/product-service.interface';
import { GoogleSheetsService } from '../../../services/google-sheets/google-sheets.service';
import { PRODUCT_SERVICE_TOKEN } from '../../../services/interfaces/product.service.token';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ ProductCardComponent, SearchbarComponent, NoProductsMessageComponent ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  providers: [
    { provide: PRODUCT_SERVICE_TOKEN, useClass: GoogleSheetsService}
  ]
})
export class ProductListComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  
  constructor(
    @Inject(PRODUCT_SERVICE_TOKEN) private productService : IProductService
  )
  {
    productService.getAll()
      .subscribe((data: Product[]) => {
        this.filteredProducts = this.products = data;
      });
  }

  Pesquisar(search: Search){
    this.productService.getByName(search.searchText)
      .subscribe((data: Product[]) => {
        this.products = data;
      })
    this.FiltrarCategoria(search.category);
  }

  FiltrarCategoria(category: Category){
    if(category.id == 1 && category.Nome == 'Todos')
      this.filteredProducts = this.products;
    else 
      this.filteredProducts = this.products.filter(p => p.idCategory == category.id);
  }
}
