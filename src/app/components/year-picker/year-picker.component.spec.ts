import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponentModule } from '../icon/icon.component.module';
import { YearPickerComponent } from './year-picker.component';

describe('YearPickerComponent', () => {
  let fixture: ComponentFixture<YearPickerComponent>;
  let component: YearPickerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YearPickerComponent],
      imports: [IconComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(YearPickerComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    component['value'] = 2023;
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
    component.onClickYear({
      status: { disabled: false, selected: false },
      value: 2024
    });

    expect(component['value']).toBe(2024);
  });

  it('should change value component from external', () => {
    component.writeValue(2025);

    expect(component['value']).toBe(2025);
  });

  it('should navigate in component change year', () => {
    component.writeValue(2024); // Init component

    const [firstYear1] = component['years'];

    expect(firstYear1.value).toBe(2020);

    component.onClickPrev();

    const [firstYear2] = component['years'];

    expect(firstYear2.value).toBe(2012);

    component.writeValue(2024); // Reset component

    component.onClickNext();

    const [firstYear3] = component['years'];

    expect(firstYear3.value).toBe(2028);
  });

  it('should overflow component data', () => {
    component.writeValue(2024); // Init component

    component.minDate = new Date(2022, 1, 1);
    component.maxDate = new Date(2027, 1, 1);

    component.writeValue(2029); // overflow max

    expect(component['value']).toBe(2027);

    component.writeValue(2020); // overflow min

    expect(component['value']).toBe(2022);
  });
});
