import { Observable, Subscription } from 'rxjs';
import { Product } from './entities';

export abstract class ProductRepository {
  abstract register(product: Product): Promise<void>;

  abstract fetchAll(subscriber: (products?: Product[]) => void): Subscription;

  abstract fecthForId(productId: string): Observable<Product | undefined>;

  abstract update(product: Product): Promise<void>;

  abstract remove(product: Product): Promise<void>;

  abstract verify(productId: string): Promise<boolean>;
}
