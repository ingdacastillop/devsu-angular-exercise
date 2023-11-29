import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormProductPage } from './form-product.page';

const routes: Routes = [
  {
    path: '',
    component: FormProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormProductPageRouting {}
