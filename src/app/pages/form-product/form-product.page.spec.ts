import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  DateFieldComponentModule,
  TextFieldComponentModule
} from '../../components';
import { ProductRepository } from '../../domain/repositories';
import { FormProductPage } from './form-product.page';
import { FormProductPageRouting } from './form-product.page.routing';

describe('FormProductPage', () => {
  let fixture: ComponentFixture<FormProductPage>;
  let component: FormProductPage;

  const repositorySpy = {
    fecthForId: jasmine.createSpy('fecthForId'),
    register: jasmine.createSpy('register'),
    update: jasmine.createSpy('update'),
    verify: jasmine.createSpy('verify')
  };

  beforeEach(async () => {
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
          provide: ProductRepository,
          useValue: repositorySpy
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormProductPage);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
