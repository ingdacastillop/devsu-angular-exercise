import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from './date-picker.component';
import { DayPickerComponentModule } from '../day-picker/day-picker.component.module';
import { MonthPickerComponentModule } from '../month-picker/month-picker.component.module';
import { YearPickerComponentModule } from '../year-picker/year-picker.component.module';

describe('DatePickerComponent', () => {
  let fixture: ComponentFixture<DatePickerComponent>;
  let component: DatePickerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatePickerComponent],
      imports: [
        ReactiveFormsModule,
        DayPickerComponentModule,
        MonthPickerComponentModule,
        YearPickerComponentModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should allow register an onChange function', () => {
    const onChange = (_?: Date): void => {};

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

  it('should change visibility elements in picker', () => {
    component.onClickDay();

    expect(component['visibility'].day).toBeTrue();

    component.onClickMonth();

    expect(component['visibility'].month).toBeTrue();

    component.onClickYear();

    expect(component['visibility'].year).toBeTrue();
  });

  it('should render description in childrens', () => {
    component.writeValue(new Date(2023, 4, 30));

    expect(component.title).toBe('Martes, May 30 de 2023');
    expect(component.year).toBe('2023');
    expect(component.month).toBe('Mayo');
  });

  it('should call emitter for parent', () => {
    const emitSpy = spyOn(component['listener'], 'emit').and.callThrough();

    component.onSelect();

    expect(emitSpy).toHaveBeenCalledTimes(1);

    component.onToday();

    expect(emitSpy).toHaveBeenCalledTimes(2);

    component.onCancel();

    expect(emitSpy).toHaveBeenCalledTimes(3);
  });

  it('should overflow component dates min and max', () => {
    component.minDate = new Date(2022, 4, 1);
    component.maxDate = new Date(2022, 4, 31);

    component.writeValue(new Date(2022, 8, 3));

    expect(component['value'].getMonth()).toBe(4);

    component.writeValue(new Date(2022, 0, 24));

    expect(component['value'].getMonth()).toBe(4);
  });
});
