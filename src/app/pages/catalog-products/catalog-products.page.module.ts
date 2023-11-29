import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CatalogProductsPage } from './catalog-products.page';
import { CatalogProductsPageRouting } from './catalog-products.page.routing';

@NgModule({
  declarations: [CatalogProductsPage],
  imports: [CommonModule, CatalogProductsPageRouting],
  exports: [CatalogProductsPage]
})
export class CatalogProductsPageModule {}
