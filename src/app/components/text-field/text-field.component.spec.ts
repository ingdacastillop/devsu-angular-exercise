import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFieldComponentModule } from '../input-field/input-field.component.module';
import { TextFieldComponent } from './text-field.component';

describe('TextFieldComponent', () => {
  let fixture: ComponentFixture<TextFieldComponent>;
  let component: TextFieldComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextFieldComponent],
      imports: [ReactiveFormsModule, InputFieldComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TextFieldComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should change values for status', () => {
    expect(component['status'].active).toBeFalse();
    expect(component['status'].disabled).toBeFalse();
    expect(component['status'].error).toBeFalse();

    component.onStatus({ active: true, disabled: true, error: true });

    expect(component['status'].active).toBeTrue();
    expect(component['status'].disabled).toBeTrue();
    expect(component['status'].error).toBeTrue();
  });

  it('should get error messages for validators', () => {
    const formControl = new FormControl('', [Validators.required]);

    component.inputControl = formControl;

    expect(component.errorMessage).toBe('Campo inválido');

    formControl.setValue('Daniel Castillo');

    expect(component.errorMessage).toBe('');

    formControl.setValidators([Validators.required, Validators.email]);
    formControl.updateValueAndValidity();

    expect(component.errorMessage).toBe('');
  });
});
