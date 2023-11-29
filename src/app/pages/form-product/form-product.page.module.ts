import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  DateFieldComponentModule,
  TextFieldComponentModule
} from '../../components';
import { FormProductPage } from './form-product.page';
import { FormProductPageRouting } from './form-product.page.routing';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FormProductPage],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormProductPageRouting,
    TextFieldComponentModule,
    DateFieldComponentModule
  ],
  exports: [FormProductPage]
})
export class FormProductPageModule {}
