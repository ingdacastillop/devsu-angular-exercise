import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonthPickerComponent } from './month-picker.component';

describe('MonthPickerComponent', () => {
  let fixture: ComponentFixture<MonthPickerComponent>;
  let component: MonthPickerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthPickerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MonthPickerComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should allow register an onChange function', () => {
    const onChange = (_?: number): void => {};

    component.registerOnChange(onChange);

    expect(component['onChange']).toBe(onChange);
  });

  it('should allow register an onTouched function', () => {
    const onTouched = (_?: boolean): void => {};

    component.registerOnTouched(onTouched);

    expect(component['onTouched']).toBe(onTouched);
  });

  it('should allow toggle status disabled from external', () => {
    expect(component['status'].disabled).toBeFalse();

    component.setDisabledState(true);

    expect(component['status'].disabled).toBeTrue();

    component.setDisabledState(false);

    expect(component['status'].disabled).toBeFalse();
  });

  it('should change value when select year element', () => {
    component.onClickMonth({ label: 'Mayo', value: 4 });

    expect(component['value']).toBe(4);
  });

  it('should change value component from external', () => {
    component.writeValue(2025);

    expect(component['value']).toBe(2025);
  });

  it('should overflow component data', () => {
    component.date = new Date(2022, 4, 15)

    component.writeValue(4); // Init component

    component.minDate = new Date(2022, 2, 1);
    component.maxDate = new Date(2022, 7, 1);

    component.writeValue(9); // overflow max

    expect(component['value']).toBe(7);

    component.writeValue(1); // overflow min

    expect(component['value']).toBe(2);
  });
});
