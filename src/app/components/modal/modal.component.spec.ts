import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { TextFieldComponent } from '../text-field/text-field.component';

describe('ModalComponent', () => {
  let fixture: ComponentFixture<ModalComponent>;
  let component: ModalComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle status visibility from external', () => {
    expect(component.show).toBeFalse();

    component.open();

    expect(component.show).toBeTrue();

    component.close();

    expect(component.show).toBeFalse();
  });

  it('should append child element in component', () => {
    const refSpy = {
      nativeElement: {
        querySelector: jasmine.createSpy('querySelector')
      }
    };

    const elementSpy = {
      appendChild: jasmine.createSpy('appendChild')
    };

    refSpy.nativeElement.querySelector.and.returnValue(elementSpy);

    component['elementRef'] = refSpy;

    component.append(TextFieldComponent);

    expect(refSpy.nativeElement.querySelector).toHaveBeenCalledTimes(1);
    expect(elementSpy.appendChild).toHaveBeenCalledTimes(1);
    expect(elementSpy.appendChild).toHaveBeenCalledWith(TextFieldComponent);
  });
});
