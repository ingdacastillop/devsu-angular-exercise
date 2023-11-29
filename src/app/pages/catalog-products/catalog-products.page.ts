import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  protected catalog?: Product[];

  constructor(private router: Router, private products: ProductRepository) {}

  public ngOnInit(): void {
    this.products.fetchAll().then((products) => (this.catalog = products));
  }

  public goFormProductForCreate(): void {
    this.router.navigateByUrl('/form-product');
  }
}
