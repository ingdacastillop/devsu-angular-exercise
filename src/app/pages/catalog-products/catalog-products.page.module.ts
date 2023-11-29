import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginationComponentModule } from '../../components';
import { CatalogProductsPage } from './catalog-products.page';
import { CatalogProductsPageRouting } from './catalog-products.page.routing';

@NgModule({
  declarations: [CatalogProductsPage],
  imports: [CommonModule, CatalogProductsPageRouting, PaginationComponentModule],
  exports: [CatalogProductsPage]
})
export class CatalogProductsPageModule {}
