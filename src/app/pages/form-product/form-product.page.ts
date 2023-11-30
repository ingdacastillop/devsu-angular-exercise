import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { Product } from '../../domain/entities';
import { ProductRepository } from '../../domain/repositories';
import { changeYear } from '@xofttion/utils';

@Component({
  selector: 'form-product-page',
  templateUrl: './form-product.page.html',
  styleUrls: ['./form-product.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormProductPage implements OnInit, OnDestroy {
  public revisionDate: FormControl;

  protected today = new Date();

  protected form: FormGroup;

  protected product?: Product;

  protected productIdInvalid = false;

  private subscriptions: Subscription[] = [];

  private currentTimeout: any;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private products: ProductRepository
  ) {
    this.form = new FormGroup({
      id: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)
      ]),
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200)
      ]),
      logo: new FormControl(null, [Validators.required]),
      releaseDate: new FormControl(null, [Validators.required])
    });

    this.revisionDate = new FormControl(null, [Validators.required]);
  }

  public ngOnInit(): void {
    this.activateRoute.queryParams.pipe(take(1)).subscribe((value) => {
      const productId = value['id'];

      if (productId) {
        this.products.fecthForId(productId).subscribe((product) => {
          if (product) {
            this.id.setValue(product.id);
            this.name.setValue(product.name);
            this.description.setValue(product.description);
            this.logo.setValue(product.logo);
            this.releaseDate.setValue(product.releaseDate);
            this.revisionDate.setValue(product.revisionDate);
          }

          this.product = product;
        });
      }
    });

    this.subscriptions.push(
      this.releaseDate.valueChanges.subscribe((releaseDate) => {
        if (releaseDate) {
          this.revisionDate.setValue(
            changeYear(releaseDate, releaseDate.getFullYear() + 1)
          );
        } else {
          this.revisionDate.setValue(undefined);
        }
      })
    );

    this.subscriptions.push(
      this.id.valueChanges.subscribe((productId) => {
        if (this.currentTimeout) {
          clearTimeout(this.currentTimeout);
        }

        this.currentTimeout = setTimeout(() => {
          if (this.id.valid && !this.product) {
            this.products.verify(productId).then((invalid) => {
              this.productIdInvalid = invalid;
            });
          }
        }, 1500);
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
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

    (!this.product
      ? this.products.register(product)
      : this.products.update(product)
    )
      .then(() => {
        this.router.navigateByUrl('/catalog');
      })
      .finally(() => this.onDisabledControls(false));
  }

  public onReset(): void {
    this.product = undefined;
    this.form.reset();
  }

  private onDisabledControls(disabled: boolean): void {
    disabled ? this.form.disable() : this.form.enable();
  }
}
