import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from '../domain/entities';
import { ProductRepository } from '../domain/repositories';
import { firstValueFrom, tap } from 'rxjs';

const apiUrl = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class RemoteProductRepository implements ProductRepository {
  private products?: Product[];

  constructor(private http: HttpClient) {}

  public register(product: Product): Promise<void> {
    const [date_revision] = product.revisionDate.toISOString().split('T');
    const [date_release] = product.releaseDate.toISOString().split('T');

    return firstValueFrom(
      this.http
        .post<void>(apiUrl, {
          id: product.id,
          name: product.name,
          description: product.description,
          logo: product.logo,
          date_release,
          date_revision
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

    return Promise.resolve([]);
  }

  public update(product: Product): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public remove(product: Product): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
