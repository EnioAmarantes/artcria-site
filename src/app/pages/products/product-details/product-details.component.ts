import { Component, Input } from '@angular/core';
import { Product } from '../../../models/product.class';
import { ProductsService } from '../../../services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, NgIf } from '@angular/common';
import { NoProductsMessageComponent } from '../no-products-message/no-products-message.component';
import { MatCard, MatCardContent, MatCardHeader, MatCardImage, MatCardSubtitle, MatCardTitle, MatCardTitleGroup } from '@angular/material/card';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    NoProductsMessageComponent,
    MatCard,
    MatCardHeader,
    MatCardTitleGroup,
    MatCardTitle,
    MatCardSubtitle,
    MatCardImage,
    MatCardContent,
    CurrencyPipe,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  @Input() product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = +params.get('id')!;
      this.product = this.productsService.getById(id);
    })
  }
}
