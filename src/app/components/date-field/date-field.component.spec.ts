import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateFieldComponent } from './date-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponentModule } from '../date-picker/date-picker.component.module';
import { IconComponentModule } from '../icon/icon.component.module';
import { ModalComponentModule } from '../modal/modal.component.module';

describe('DateFieldComponent', () => {
  let fixture: ComponentFixture<DateFieldComponent>;
  let component: DateFieldComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateFieldComponent],
      imports: [
        ReactiveFormsModule,
        DatePickerComponentModule,
        ModalComponentModule,
        IconComponentModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DateFieldComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
    expect(component.iconAction).toBe('calendar');
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

    expect(component.isDisabled).toBeFalse();
  });

  it('should allow toggle status active from internal', () => {
    expect(component['status'].active).toBeFalse();

    component.onFocus();

    expect(component['status'].active).toBeTrue();

    component.onBlur();

    expect(component['status'].active).toBeFalse();
  });

  it('should wrtie value from external calls', () => {
    component.writeValue(new Date(2022, 8, 3));

    expect(component['value']?.getMonth()).toBe(8);
    expect(component.iconAction).toBe('trash-2');

    component['approvedValue'](new Date(2022, 0, 24));

    expect(component['value']?.getMonth()).toBe(0);
    expect(component.iconAction).toBe('trash-2');

    component.writeValue(undefined);

    expect(component['value']).toBeUndefined();
    expect(component.iconAction).toBe('calendar');
  });
});
