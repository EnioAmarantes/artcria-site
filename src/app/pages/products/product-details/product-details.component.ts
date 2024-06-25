import { Component, Inject, Input } from '@angular/core';
import { Product } from '../../../models/product.class';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { NoProductsMessageComponent } from '../no-products-message/no-products-message.component';
import { MatCard, MatCardContent, MatCardHeader, MatCardImage, MatCardSubtitle, MatCardTitle, MatCardTitleGroup } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { IProductService } from '../../../services/interfaces/product-service.interface';
import { PRODUCT_SERVICE_TOKEN } from '../../../services/interfaces/product.service.token';
import { GoogleSheetsService } from '../../../services/google-sheets/google-sheets.service';

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
    MatButton,
    MatIcon,
    RouterLink,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  providers: [
    { provide: PRODUCT_SERVICE_TOKEN, useClass: GoogleSheetsService }
  ]
})
export class ProductDetailsComponent {
  @Input() product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    @Inject(PRODUCT_SERVICE_TOKEN) private productsService: IProductService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = +params.get('id')!;
      this.productsService.getById(id)
        .subscribe((data: Product) => {
          this.product = data;
        });
    })
  }

  TenhoInteresse(): string {
    return `Olá, tenho interesse neste produto ${this.product?.Nome}`;
  }
}
