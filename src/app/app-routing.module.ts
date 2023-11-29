import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'catalog',
    pathMatch: 'full'
  },
  {
    path: 'catalog',
    loadChildren: () =>
      import('./pages/catalog-products/catalog-products.page.module').then(
        (ref) => ref.CatalogProductsPageModule
      )
  },
  {
    path: 'form-product',
    loadChildren: () =>
      import('./pages/form-product/form-product.page.module').then(
        (ref) => ref.FormProductPageModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
