import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogProductsPage } from './catalog-products.page';

const routes: Routes = [
  {
    path: '',
    component: CatalogProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogProductsPageRouting {}
