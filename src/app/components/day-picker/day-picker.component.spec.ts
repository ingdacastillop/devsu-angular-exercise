import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DayPickerComponent } from './day-picker.component';

describe('DayPickerComponent', () => {
  let fixture: ComponentFixture<DayPickerComponent>;
  let component: DayPickerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DayPickerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DayPickerComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    component.ngOnInit();
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
    component.onClickDay({
      status: { disabled: false, forbidden: false },
      value: 4
    });

    expect(component['value']).toBe(4);
  });

  it('should change value component from external', () => {
    component.writeValue(2025);

    expect(component['value']).toBe(2025);
  });

  it('should overflow component dates min and max', () => {
    component.date = new Date(2022, 4, 15);

    component.writeValue(4); // Init component

    component.minDate = new Date(2022, 4, 10);
    component.maxDate = new Date(2022, 4, 24);

    const maxDate = new SimpleChange(null, new Date(2022, 4, 30), true);

    component.ngOnChanges({ date: maxDate });

    expect(component['value']).toBe(24);

    const minDate = new SimpleChange(null, new Date(2022, 4, 4), true);

    component.ngOnChanges({ date: minDate });

    expect(component['value']).toBe(10);
  });
});
