import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject, of } from 'rxjs';
import {
  DateFieldComponentModule,
  TextFieldComponentModule
} from '../../components';
import { Product } from '../../domain/entities';
import { ProductRepository } from '../../domain/repositories';
import { FormProductPage } from './form-product.page';
import { FormProductPageRouting } from './form-product.page.routing';

describe('FormProductPage', () => {
  let fixture: ComponentFixture<FormProductPage>;
  let component: FormProductPage;

  let queryParams: Subject<any>;

  const routerSpy = {
    navigateByUrl: jasmine.createSpy('navigateByUrl')
  };

  const repositorySpy = {
    fecthForId: jasmine.createSpy('fecthForId'),
    update: jasmine.createSpy('update'),
    verify: jasmine.createSpy('verify'),
    register: jasmine.createSpy('register')
  };

  beforeEach(async () => {
    queryParams = new Subject();

    await TestBed.configureTestingModule({
      declarations: [FormProductPage],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormProductPageRouting,
        TextFieldComponentModule,
        DateFieldComponentModule
      ],
      providers: [
        {
          provide: Router,
          useValue: routerSpy
        },
        {
          provide: ActivatedRoute,
          useValue: { queryParams }
        },
        {
          provide: ProductRepository,
          useValue: repositorySpy
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormProductPage);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    routerSpy.navigateByUrl.calls.reset();
    repositorySpy.fecthForId.calls.reset();
    repositorySpy.update.calls.reset();
    repositorySpy.verify.calls.reset();
    repositorySpy.register.calls.reset();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return undefined product in fetchForId', () => {
    repositorySpy.fecthForId.and.returnValue(of(undefined));

    expect(component['product']).toBeUndefined();
    expect(repositorySpy.fecthForId).toHaveBeenCalledTimes(0);

    component.ngOnInit();

    queryParams.next({ id: 'product-00' });

    expect(component['product']).toBeUndefined();
    expect(repositorySpy.fecthForId).toHaveBeenCalledTimes(1);
  });

  it('should return product in fetchForId', () => {
    const product = new Product(
      'prod-11',
      'CIBC U.S. Dollar Aventura® Gold Visa* Card',
      'Shop across the border? Skip the currency conversion fees.',
      'https://www.cibc.com/content/dam/global-assets/card-art/credit-cards/aventura-cards/cibc-us-dollar-aventura-gold-visa-card/cibc-visa-aventura-us-dollar-en.png/_jcr_content/renditions/cq5dam.thumbnail.319.319.png',
      new Date('2023-11-27T00:00:00.000+00:00'),
      new Date('2024-11-27T00:00:00.000+00:00')
    );

    repositorySpy.fecthForId.and.returnValue(of(product));

    expect(component['product']).toBeUndefined();
    expect(repositorySpy.fecthForId).toHaveBeenCalledTimes(0);

    component.ngOnInit();

    queryParams.next({ id: 'prod-11' });

    expect(component['product']).toEqual(product);
    expect(repositorySpy.fecthForId).toHaveBeenCalledTimes(1);
  });

  it('should trigger verify of productId with value changes', () => {
    const clock = jasmine.clock();

    jasmine.clock().install();

    repositorySpy.verify.and.returnValues(
      Promise.resolve(false),
      Promise.resolve(true)
    );

    expect(component['productIdInvalid']).toBeFalse();

    component.ngOnInit();

    component.id.setValue('pro');
    clock.tick(1200);

    expect(repositorySpy.verify).toHaveBeenCalledTimes(0);

    component.id.setValue('product-2');
    clock.tick(1600);

    expect(repositorySpy.verify).toHaveBeenCalledTimes(1);
    expect(repositorySpy.verify).toHaveBeenCalledWith('product-2');

    component.id.setValue('product-24');
    clock.tick(1800);

    expect(repositorySpy.verify).toHaveBeenCalledTimes(2);
    expect(repositorySpy.verify).toHaveBeenCalledWith('product-24');

    clock.uninstall();
  });

  it('should execute register product from repository', (done) => {
    const disableSpy = spyOn(component['form'], 'disable').and.callThrough();
    const enableSpy = spyOn(component['form'], 'enable').and.callThrough();

    expect(component['product']).toBeUndefined();

    component.id.setValue('product-00');
    component.name.setValue('CIBC Aventura® Visa Infinite* Card');
    component.description.setValue(
      'Experience more of the world with our most flexible travel rewards program.'
    );
    component.logo.setValue(
      'https://www.cibc.com/content/dam/global-assets/card-art/credit-cards/aventura-cards/cibc-aventura-visa-infinite-card/cibc-visa-aventura-infinite-fr.png/_jcr_content/renditions/cq5dam.thumbnail.319.319.png'
    );
    component.releaseDate.setValue(new Date('2023-11-09T00:00:00.000+00:00'));
    component.revisionDate.setValue(new Date('2024-11-09T00:00:00.000+00:00'));

    repositorySpy.register.and.resolveTo(undefined);

    component.onSubmit().then(() => {
      expect(repositorySpy.register).toHaveBeenCalledTimes(1);
      expect(repositorySpy.update).toHaveBeenCalledTimes(0);
      expect(routerSpy.navigateByUrl).toHaveBeenCalledTimes(1);
      expect(enableSpy).toHaveBeenCalledTimes(1);
      expect(disableSpy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should execute update product from repository', (done) => {
    const disableSpy = spyOn(component['form'], 'disable').and.callThrough();
    const enableSpy = spyOn(component['form'], 'enable').and.callThrough();

    const product = new Product(
      'prod-11',
      'CIBC U.S. Dollar Aventura® Gold Visa* Card',
      'Shop across the border? Skip the currency conversion fees.',
      'https://www.cibc.com/content/dam/global-assets/card-art/credit-cards/aventura-cards/cibc-us-dollar-aventura-gold-visa-card/cibc-visa-aventura-us-dollar-en.png/_jcr_content/renditions/cq5dam.thumbnail.319.319.png',
      new Date('2023-11-27T00:00:00.000+00:00'),
      new Date('2024-11-27T00:00:00.000+00:00')
    );

    repositorySpy.fecthForId.and.returnValue(of(product));

    expect(component['product']).toBeUndefined();
    expect(repositorySpy.fecthForId).toHaveBeenCalledTimes(0);

    component.ngOnInit();

    queryParams.next({ id: 'prod-11' });

    expect(component['product']).toEqual(product);
    expect(repositorySpy.fecthForId).toHaveBeenCalledTimes(1);

    component.name.setValue('CIBC Aventura® Visa Infinite* Card');
    component.description.setValue(
      'Experience more of the world with our most flexible travel rewards program.'
    );
    component.logo.setValue(
      'https://www.cibc.com/content/dam/global-assets/card-art/credit-cards/aventura-cards/cibc-aventura-visa-infinite-card/cibc-visa-aventura-infinite-fr.png/_jcr_content/renditions/cq5dam.thumbnail.319.319.png'
    );
    component.releaseDate.setValue(new Date('2023-11-09T00:00:00.000+00:00'));
    component.revisionDate.setValue(new Date('2024-11-09T00:00:00.000+00:00'));

    repositorySpy.update.and.resolveTo(undefined);

    component.onSubmit().then(() => {
      expect(repositorySpy.register).toHaveBeenCalledTimes(0);
      expect(repositorySpy.update).toHaveBeenCalledTimes(1);
      expect(routerSpy.navigateByUrl).toHaveBeenCalledTimes(1);
      expect(enableSpy).toHaveBeenCalledTimes(1);
      expect(disableSpy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should call reset data in form', () => {
    const resetSpy = spyOn(component['form'], 'reset').and.callThrough();

    component.onReset();

    expect(component['product']).toBeUndefined();
    expect(resetSpy).toHaveBeenCalledTimes(1);
  });
});
