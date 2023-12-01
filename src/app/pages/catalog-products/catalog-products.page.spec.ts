import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IconComponentModule,
  InputFieldComponentModule,
  PaginationComponentModule,
  PopupComponentModule,
  SelectFieldComponentModule
} from '../../components';
import { PopupComponentService } from '../../components/popup/popup.component.service';
import { Product } from '../../domain/entities';
import { ProductRepository } from '../../domain/repositories';
import { CatalogProductsPage } from './catalog-products.page';
import { CatalogProductsPageRouting } from './catalog-products.page.routing';
import { BehaviorSubject } from 'rxjs';

describe('CatalogProductsPage', () => {
  let fixture: ComponentFixture<CatalogProductsPage>;
  let component: CatalogProductsPage;

  const products$ = new BehaviorSubject<Product[]>([]);

  const routerSpy = {
    navigateByUrl: jasmine.createSpy('navigateByUrl')
  };

  const popupSpy = {
    launch: jasmine.createSpy('launch')
  };

  const repositorySpy = {
    fetchAll: (subscriber: (products: Product[]) => void) => {
      return products$.subscribe(subscriber);
    },
    remove: jasmine.createSpy('remove')
  };

  const product1 = new Product(
    'prod-10',
    'CIBC U.S. Dollar Aventura® Gold Visa* Card',
    'Shop across the border? Skip the currency conversion fees.',
    'https://www.cibc.com/content/dam/global-assets/card-art/credit-cards/aventura-cards/cibc-us-dollar-aventura-gold-visa-card/cibc-visa-aventura-us-dollar-en.png/_jcr_content/renditions/cq5dam.thumbnail.319.319.png',
    new Date('2023-11-27T00:00:00.000+00:00'),
    new Date('2024-11-27T00:00:00.000+00:00')
  );

  const product2 = new Product(
    'prod-11',
    'CIBC Dividend® Visa* Card',
    'Shop across the border? Skip the currency conversion fees.',
    'https://www.cibc.com/content/dam/global-assets/card-art/credit-cards/aventura-cards/cibc-us-dollar-aventura-gold-visa-card/cibc-visa-aventura-us-dollar-en.png/_jcr_content/renditions/cq5dam.thumbnail.319.319.png',
    new Date('2023-11-27T00:00:00.000+00:00'),
    new Date('2024-11-27T00:00:00.000+00:00')
  );

  const products = [product1, product2];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogProductsPage],
      imports: [
        ReactiveFormsModule,
        CatalogProductsPageRouting,
        IconComponentModule,
        InputFieldComponentModule,
        SelectFieldComponentModule,
        PaginationComponentModule,
        PopupComponentModule
      ],
      providers: [
        {
          provide: Router,
          useValue: routerSpy
        },
        {
          provide: PopupComponentService,
          useValue: popupSpy
        },
        {
          provide: ProductRepository,
          useValue: repositorySpy
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogProductsPage);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    repositorySpy.remove.calls.reset();
    popupSpy.launch.calls.reset();
    routerSpy.navigateByUrl.calls.reset();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should init subscriber for fetch products', () => {
    const fetchAllSpy = spyOn(repositorySpy, 'fetchAll').and.callThrough();

    expect(component['catalog']).toBeUndefined();

    component.ngOnInit();

    expect(fetchAllSpy).toHaveBeenCalledTimes(1);

    products$.next(products);

    expect(component['catalog']).toEqual(products);
  });

  it('should navigate route to FormProductPage', () => {
    component.goFormProductForCreate();

    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/form-product');
    expect(routerSpy.navigateByUrl).toHaveBeenCalledTimes(1);
  });

  it('should change properties when select product from component', () => {
    expect(component['product']).toBeUndefined();
    expect(component['dropdown']).toBeFalse();
    expect(component['dropdownPosition'].left).toBe('0px');
    expect(component['dropdownPosition'].top).toBe('0px');

    const event: any = { clientY: 100, clientX: 150 };

    component.onClickAction(product1, event);

    expect(component['product']).toEqual(product1);
    expect(component['dropdown']).toBeTrue();
    expect(component['dropdownPosition'].left).toBe('150px');
    expect(component['dropdownPosition'].top).toBe('100px');
  });

  it('should execute update product from component', () => {
    const event: any = { clientY: 100, clientX: 150 };

    component.onClickAction(product1, event);
    expect(component['dropdown']).toBeTrue();

    component.onUpdateProduct();

    expect(component['dropdown']).toBeFalse();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledTimes(1);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(
      `/form-product?id=${product1.id}`
    );
  });

  it('should execute remove product from component', () => {
    component.onRemoveProduct();

    expect(popupSpy.launch).toHaveBeenCalledTimes(0);

    const event: any = { clientY: 100, clientX: 150 };

    component.onClickAction(product1, event);
    expect(component['dropdown']).toBeTrue();

    component.onRemoveProduct();

    expect(popupSpy.launch).toHaveBeenCalledTimes(1);
  });

  it('should assign products from pagination', fakeAsync(() => {
    expect(component['results']).toEqual([]);

    component.onPagination(products);

    tick(100);

    expect(component['results']).toEqual(products);

    flush();
  }));
});
