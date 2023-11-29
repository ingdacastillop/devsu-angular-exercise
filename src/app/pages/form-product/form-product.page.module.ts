import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TextFieldComponentModule } from '../../components';
import { FormProductPage } from './form-product.page';
import { FormProductPageRouting } from './form-product.page.routing';

@NgModule({
  declarations: [FormProductPage],
  imports: [CommonModule, FormProductPageRouting, TextFieldComponentModule],
  exports: [FormProductPage]
})
export class FormProductPageModule {}
