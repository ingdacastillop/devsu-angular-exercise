import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListFieldElement } from '../../components/list-field/list-field-element';
import { Product } from '../../domain/entities';
import { ProductRepository } from '../../domain/repositories';
import { PopupComponentService } from 'src/app/components/popup/popup.component.service';

class CountPaginationElement implements ListFieldElement<number> {
  public readonly description: string;

  public readonly title: string;

  constructor(public readonly value: number) {
    this.description = `${value} producto(s)`;
    this.title = `${value} producto(s)`;
  }

  /* istanbul ignore next */
  public compareTo(value: number): boolean {
    return this.value === value;
  }

  /* istanbul ignore next */
  public hasCoincidence(_: string): boolean {
    return true;
  }
}

interface DropdownPosition {
  top: string;
  left: string;
}

@Component({
  selector: 'catalog-products-page',
  templateUrl: './catalog-products.page.html',
  styleUrls: ['./catalog-products.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CatalogProductsPage implements OnInit, OnDestroy {
  protected filterControl: FormControl;

  protected counterControl: FormControl;

  protected catalog?: Product[];

  protected results: Product[] = [];

  protected counters: CountPaginationElement[];

  protected dropdown = false;

  protected dropdownPosition: DropdownPosition;

  private declare subscription: Subscription;

  private declare product?: Product;

  constructor(
    private router: Router,
    private popupService: PopupComponentService,
    private products: ProductRepository
  ) {
    this.filterControl = new FormControl();

    this.counterControl = new FormControl(5);

    this.counters = [
      new CountPaginationElement(5),
      new CountPaginationElement(10),
      new CountPaginationElement(20)
    ];

    this.dropdownPosition = {
      top: '0px',
      left: '0px'
    };
  }

  public ngOnInit(): void {
    this.subscription = this.products.fetchAll(
      (products) => (this.catalog = products)
    );
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public onPagination(products: Product[]): void {
    setTimeout(() => {
      this.results = products;
    }, 0);
  }

  public goFormProductForCreate(): void {
    this.router.navigateByUrl('/form-product');
  }

  public onClickAction(product: Product, event: MouseEvent): void {
    this.dropdownPosition.top = event.clientY + 'px';
    this.dropdownPosition.left = event.clientX + 'px';

    this.product = product;

    this.dropdown = true;
  }

  public onUpdateProduct(): void {
    this.router.navigateByUrl(`/form-product?id=${this.product?.id}`);
    this.onCloseDropdown();
  }

  public onRemoveProduct(): void {
    this.onCloseDropdown();

    if (this.product) {
      const currentProduct = this.product;

      this.popupService.launch({
        message: `¿Estas seguro de eliminar el product ${currentProduct.name}?`,
        approved: {
          label: 'Confirmar',
          onClick: /* istanbul ignore next */ () => {
            this.products.remove(currentProduct).then(() => {
              this.product = undefined;
            });
          }
        },
        reject: {
          label: 'Cancelar'
        }
      });
    }
  }

  public onCloseDropdown(): void {
    this.dropdown = false;
  }
}
