import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'catalog-products-page',
  templateUrl: './catalog-products.page.html',
  styleUrls: ['./catalog-products.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CatalogProductsPage {
  constructor(private router: Router) {}

  public goFormProductForCreate(): void {
    this.router.navigateByUrl('/form-product');
  }
}
