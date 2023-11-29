import { Injectable } from '@angular/core';
import { Product } from '../domain/entities';
import { ProductRepository } from '../domain/repositories';

@Injectable({ providedIn: 'root' })
export class RemoteProductRepository implements ProductRepository {
  private products?: Product[];

  public register(product: Product): Promise<void> {
    throw new Error('Method not implemented.');
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
