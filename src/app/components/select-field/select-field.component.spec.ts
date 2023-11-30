import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BallotComponentModule } from '../ballot/ballot.component.module';
import { IconComponentModule } from '../icon/icon.component.module';
import { SelectFieldComponent } from './select-field.component';

describe('SelectFieldComponent', () => {
  let fixture: ComponentFixture<SelectFieldComponent>;
  let component: SelectFieldComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectFieldComponent],
      imports: [ReactiveFormsModule, IconComponentModule, BallotComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectFieldComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle status show for list in component', () => {
    expect(component['status'].show).toBeFalse();

    component.onClickInput();

    expect(component['status'].show).toBeTrue();

    component.onClickAction();

    expect(component['status'].show).toBeFalse();

    component.onClickAction();

    expect(component['status'].show).toBeTrue();
  });

  it('should change value component from internal', () => {
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

    component.onSelect(element);

    expect(component['value']).toBe(element);
  });

  it('should check if component is external for close', () => {
    const refSpy = {
      nativeElement: {
        contains: jasmine.createSpy('contains')
      }
    };

    refSpy.nativeElement.contains.and.returnValue(true);

    component['status'].show = true;
    component['ref'] = refSpy;

    component.onClickDocument({} as any);

    expect(component['status'].show).toBeTrue();
    expect(refSpy.nativeElement.contains).toHaveBeenCalledTimes(1);

    refSpy.nativeElement.contains.and.returnValue(false);

    component.onClickDocument({} as any);

    expect(component['status'].show).toBeFalse();
    expect(refSpy.nativeElement.contains).toHaveBeenCalledTimes(2);
  });
});
