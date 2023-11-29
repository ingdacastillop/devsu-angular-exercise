import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../domain/entities';
import { ProductRepository } from '../../domain/repositories';
import { ListFieldElement } from 'src/app/components/list-field/list-field-element';

class CountPaginationElement implements ListFieldElement<number> {
  public readonly description: string;

  public readonly title: string;

  constructor(public readonly value: number) {
    this.description = `${value} producto(s)`;
    this.title = `${value} producto(s)`;
  }

  public compareTo(value: number): boolean {
    return this.value === value;
  }

  public hasCoincidence(_: string): boolean {
    return true;
  }
}

@Component({
  selector: 'catalog-products-page',
  templateUrl: './catalog-products.page.html',
  styleUrls: ['./catalog-products.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CatalogProductsPage implements OnInit {
  protected filterControl: FormControl;

  protected counterControl: FormControl;

  protected catalog?: Product[];

  protected results: Product[] = [];

  protected counters: CountPaginationElement[];

  constructor(private router: Router, private products: ProductRepository) {
    this.filterControl = new FormControl();

    this.counterControl = new FormControl(5)

    this.counters = [
      new CountPaginationElement(5),
      new CountPaginationElement(10),
      new CountPaginationElement(20)
    ];
  }

  public ngOnInit(): void {
    this.products.fetchAll().then((products) => (this.catalog = products));
  }

  public onPagination(products: Product[]): void {
    setTimeout(() => {
      this.results = products;
    }, 0);
  }

  public goFormProductForCreate(): void {
    this.router.navigateByUrl('/form-product');
  }
}
