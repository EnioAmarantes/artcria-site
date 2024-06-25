import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProductService } from '../interfaces/product-service.interface';
import { Product } from '../../models/product.class';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleSheetsService implements IProductService {

  private sheetId = environment.googleSheets.sheetId;
  private apiKey = environment.googleSheets.apiKey;

  constructor(private http: HttpClient) { }

  getByName(name: string): Observable<Product[]> {
    return this.getSheetData().pipe(
      map((products: Product[]) => 
        products.filter(p => 
          p.Nome.toLocaleLowerCase().includes(name.toLocaleLowerCase())
        )
      )
    );
  }

  getAll(): Observable<Product[]> {
    return this.getSheetData();
  }

  getById(id: number): Observable<Product> {
    return this.getSheetData().pipe(
      map((products: Product[]) => 
        products.filter(p => 
          p.id === id
        )[0]
      )
    );
  }

  private getSheetData(): Observable<Product[]> {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/Produtos?key=${this.apiKey}`;
    return this.http.get(url)
      .pipe(
        map((data: any) => this.processData(data))
      )
  }

  private processData(data: any): Product[] {
    const rows = data.values;
    const headers = rows[0];

    const headerMapping: { [key: string]: (product: Product, value: any) => void } = {
      'id': (product, value) => product.id = Number(value),
      'title': (product, value) => product.Nome = value,
      'idCategory': (product, value) => product.idCategory = Number(value),
      'description': (product, value) => product.Descricao = value,
      'price': (product, value) => product.Preco = Number(value),
      'image_link': (product, value) => product.Imagem = value.replace('https://artcria.000webhostapp.com/', ''),
      'brand': (product, value) => product.Marca = value,
      'condition': (product, value) => product.Condicao = value,
    };

    return rows.slice(1)
      .map((row: any) => {
        let product: Product = new Product();
        row.forEach((cell: any, index: number) => {
          const header = headers[index];
          const mapFunction = headerMapping[header];
          if(mapFunction) {
            mapFunction(product, cell);
          }
        });
        return product;
      });
  }
}
