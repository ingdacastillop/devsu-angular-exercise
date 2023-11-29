import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  InputFieldComponentModule,
  PaginationComponentModule
} from '../../components';
import { CatalogProductsPage } from './catalog-products.page';
import { CatalogProductsPageRouting } from './catalog-products.page.routing';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CatalogProductsPage],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogProductsPageRouting,
    InputFieldComponentModule,
    PaginationComponentModule
  ],
  exports: [CatalogProductsPage]
})
export class CatalogProductsPageModule {}
