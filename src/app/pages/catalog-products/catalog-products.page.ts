import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../domain/entities';
import { ProductRepository } from '../../domain/repositories';

@Component({
  selector: 'catalog-products-page',
  templateUrl: './catalog-products.page.html',
  styleUrls: ['./catalog-products.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CatalogProductsPage implements OnInit {
  protected filterControl: FormControl;

  protected catalog?: Product[];

  protected results: Product[] = [];

  constructor(private router: Router, private products: ProductRepository) {
    this.filterControl = new FormControl();
  }

  public ngOnInit(): void {
    this.products.fetchAll().then((products) => (this.catalog = products));
  }

  public onPagination(products: Product[]): void {
    setTimeout(() => {
      this.results = products;
    }, 0);
  }

  public goFormProductForCreate(): void {
    this.router.navigateByUrl('/form-product');
  }
}
