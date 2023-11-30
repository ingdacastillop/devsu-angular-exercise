import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  firstValueFrom,
  from,
  map,
  switchMap,
  take,
  tap
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../domain/entities';
import { ProductRepository } from '../domain/repositories';

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
  private products$: BehaviorSubject<Product[] | undefined>;

  private promiseProducts?: Promise<Product[]>;

  constructor(private http: HttpClient) {
    this.products$ = new BehaviorSubject<Product[] | undefined>(undefined);
  }

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
            if (this.products$.value) {
              this.products$.next([...this.products$.value, product]);
            }
          })
        )
    );
  }

  public fetchAll(subscriber: (value?: Product[]) => void): Subscription {
    this.remote();

    return this.products$.subscribe(subscriber);
  }

  public fecthForId(productId: string): Observable<Product | undefined> {
    return from(this.remote()).pipe(
      switchMap(() => this.products$),
      take(1),
      map((products) => products?.find((product) => product.id === productId))
    );
  }

  public update(product: Product): Promise<void> {
    return firstValueFrom(
      this.http
        .put<void>(apiUrl, {
          id: product.id,
          name: product.name,
          description: product.description,
          logo: product.logo,
          date_release: product.releaseDateFormat,
          date_revision: product.revisionDateFormat
        })
        .pipe(
          tap(() => {
            if (this.products$.value) {
              this.products$.next(
                this.products$.value.map((currentProduct) =>
                  currentProduct.id === product.id ? product : currentProduct
                )
              );
            }
          })
        )
    );
  }

  public remove({ id }: Product): Promise<void> {
    return firstValueFrom(
      this.http.delete(apiUrl, { params: { id }, responseType: 'text' }).pipe(
        tap(() => {
          if (this.products$.value) {
            const products = this.products$.value.filter(
              (currentProduct) => currentProduct.id !== id
            );

            this.products$.next(products);
          }
        })
      )
    ).then(() => undefined);
  }

  public verify(productId: string): Promise<boolean> {
    return firstValueFrom(
      this.http.get(`${apiUrl}/verification`, {
        params: { id: productId },
        responseType: 'text'
      })
    ).then((response) => response === 'true');
  }

  private remote(): Promise<Product[]> {
    if (!this.promiseProducts) {
      this.promiseProducts = firstValueFrom(
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
          tap((products) => this.products$.next(products))
        )
      ).catch((err) => {
        this.promiseProducts = undefined;
        throw err;
      });
    }

    return this.promiseProducts;
  }
}
