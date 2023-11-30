import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListFieldComponent } from './list-field.component';

describe('ListFieldComponent', () => {
  let fixture: ComponentFixture<ListFieldComponent>;
  let component: ListFieldComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListFieldComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ListFieldComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    component.ngOnInit();

    expect(component).toBeTruthy();
  });

  it('should allow register an onChange function', () => {
    const onChange = (_?: unknown): void => {};

    component.registerOnChange(onChange);

    expect(component['onChange']).toBe(onChange);
  });

  it('should allow register an onTouched function', () => {
    const onTouched = (_?: boolean): void => {};

    component.registerOnTouched(onTouched);

    expect(component['onTouched']).toBe(onTouched);
  });

  it('should allow change status disabled from external', () => {
    expect(component['status'].disabled).toBeFalse();

    component.setDisabledState(true);

    expect(component['status'].disabled).toBeTrue();

    component.setDisabledState(false);

    expect(component['status'].disabled).toBeFalse();
  });

  it('should allow toggle status active from internal', () => {
    expect(component['status'].active).toBeFalse();

    component.onFocus();

    expect(component['status'].active).toBeTrue();

    component.onBlur();

    expect(component['status'].active).toBeFalse();
  });

  it('should close component with press backdrop', () => {
    component['status'].show = true;

    component.onClickBackdrop();

    expect(component['status'].show).toBeFalse();
  });

  it('should change value component from external', () => {
    expect(component['value']).toBeUndefined(); // Default

    const value: any = {
      id: '1010',
      fullName: 'Daniel Castillo'
    };

    const element: any = {
      description: 'Daniel Castillo',
      title: 'Daniel Castillo',
      value
    };

    component.writeValue(element);

    expect(component['value']).toEqual(undefined);
  });
});
