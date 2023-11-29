import { Product } from './entities';

export abstract class ProductRepository {
  abstract register(product: Product): Promise<void>;

  abstract fetchAll(): Promise<Product[]>;

  abstract update(product: Product): Promise<void>;

  abstract remove(product: Product): Promise<void>;
}
