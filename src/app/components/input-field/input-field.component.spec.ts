import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputFieldComponent } from './input-field.component';

describe('InputFieldComponent', () => {
  let fixture: ComponentFixture<InputFieldComponent>;
  let component: InputFieldComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputFieldComponent]
    }).compileComponents();
  });

  fixture = TestBed.createComponent(InputFieldComponent);
  component = fixture.componentInstance;

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
