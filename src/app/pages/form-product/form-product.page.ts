import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../domain/entities';
import { ProductRepository } from '../../domain/repositories';

@Component({
  selector: 'form-product-page',
  templateUrl: './form-product.page.html',
  styleUrls: ['./form-product.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormProductPage {
  protected today = new Date();

  protected form: FormGroup;

  constructor(private router: Router, private products: ProductRepository) {
    this.form = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      logo: new FormControl(null, [Validators.required]),
      releaseDate: new FormControl(null, [Validators.required]),
      revisionDate: new FormControl(null, [Validators.required])
    });
  }

  public get id(): FormControl {
    return this.form.get('id') as FormControl;
  }

  public get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  public get description(): FormControl {
    return this.form.get('description') as FormControl;
  }

  public get logo(): FormControl {
    return this.form.get('logo') as FormControl;
  }

  public get releaseDate(): FormControl {
    return this.form.get('releaseDate') as FormControl;
  }

  public get revisionDate(): FormControl {
    return this.form.get('revisionDate') as FormControl;
  }

  public onSubmit(): void {
    const product = new Product(
      this.id.value,
      this.name.value,
      this.description.value,
      this.logo.value,
      this.releaseDate.value,
      this.revisionDate.value
    );

    this.onDisabledControls(true);

    this.products
      .register(product)
      .then(() => {
        this.router.navigateByUrl('/catalog');
      })
      .finally(() => this.onDisabledControls(false));
  }

  public onReset(): void {
    this.form.reset();
  }

  private onDisabledControls(disabled: boolean): void {
    disabled ? this.form.disable() : this.form.enable();
  }
}
