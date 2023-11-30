import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputFieldComponent } from './input-field.component';

describe('InputFieldComponent', () => {
  let fixture: ComponentFixture<InputFieldComponent>;
  let component: InputFieldComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputFieldComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(InputFieldComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should allow register an onChange function', () => {
    const onChange = (_?: string): void => {};

    component.registerOnChange(onChange);

    expect(component['onChange']).toBe(onChange);
  });

  it('should allow register an onTouched function', () => {
    const onTouched = (_?: boolean): void => {};

    component.registerOnTouched(onTouched);

    expect(component['onTouched']).toBe(onTouched);
  });

  it('should allow toggle status disabled from external', () => {
    const emitSpy = spyOn(component.status, 'emit').and.callThrough();

    expect(component['statusField'].disabled).toBeFalse();

    component.setDisabledState(true);

    expect(component['statusField'].disabled).toBeTrue();
    expect(emitSpy).toHaveBeenCalledTimes(1);

    component.setDisabledState(false);

    expect(component['statusField'].disabled).toBeFalse();
    expect(emitSpy).toHaveBeenCalledTimes(2);
  });

  it('should allow toggle status active from internal', () => {
    const emitSpy = spyOn(component.status, 'emit').and.callThrough();

    expect(component['statusField'].active).toBeFalse();

    component.onFocus();

    expect(component['statusField'].active).toBeTrue();
    expect(emitSpy).toHaveBeenCalledTimes(1);

    component.onBlur();

    expect(component['statusField'].active).toBeFalse();
    expect(emitSpy).toHaveBeenCalledTimes(2);
  });

  it('should change value Input from external', () => {
    expect(component['input']).toBe(''); // Default

    component.writeValue('Daniel Castillo');

    expect(component['input']).toBe('Daniel Castillo');

    component.writeValue(undefined);

    expect(component['input']).toBe(''); // Default
  });

  it('should change value Input from internal', () => {
    expect(component['input']).toBe(''); // Default

    const eventInput: any = {
      target: {
        value: 'Daniel Castillo'
      }
    };

    component.onInput(eventInput);

    expect(component['input']).toBe('Daniel Castillo');
  });
});
