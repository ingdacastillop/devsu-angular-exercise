import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from '../domain/entities';
import { ProductRepository } from '../domain/repositories';
import { firstValueFrom, map, tap } from 'rxjs';

const apiUrl = environment.apiUrl;

interface ProductResponse {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}

@Injectable({ providedIn: 'root' })
export class RemoteProductRepository implements ProductRepository {
  private products?: Product[];

  constructor(private http: HttpClient) {}

  public register(product: Product): Promise<void> {
    return firstValueFrom(
      this.http
        .post<void>(apiUrl, {
          id: product.id,
          name: product.name,
          description: product.description,
          logo: product.logo,
          date_release: product.releaseDateFormat,
          date_revision: product.revisionDateFormat
        })
        .pipe(
          tap(() => {
            this.products?.push(product);
          })
        )
    );
  }

  public fetchAll(): Promise<Product[]> {
    if (this.products) {
      return Promise.resolve(this.products);
    }

    return firstValueFrom(
      this.http.get<ProductResponse[]>(apiUrl).pipe(
        map((responses) =>
          responses.map(
            (response) =>
              new Product(
                response.id,
                response.name,
                response.description,
                response.logo,
                new Date(response.date_release),
                new Date(response.date_revision)
              )
          )
        ),
        tap((products) => (this.products = products))
      )
    );
  }

  public update(product: Product): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public remove(product: Product): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
