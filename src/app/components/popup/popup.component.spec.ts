import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopupComponent } from './popup.component';

describe('PopupComponent', () => {
  let fixture: ComponentFixture<PopupComponent>;
  let component: PopupComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should triggers approved and reject successful', () => {
    expect(component['visible']).toBeFalse();

    const action = {
      label: 'Action',
      onClick: jasmine.createSpy('onClick')
    }

    component.launch({
      message: '¿Deseas realmente eliminar los datos?',
      approved: action
    });
    
    expect(component['visible']).toBeTrue();

    component.onApproved();
    
    expect(component['visible']).toBeFalse();
    expect(action.onClick).toHaveBeenCalledTimes(1);

    component.launch({
      message: '¿Deseas realmente eliminar los datos?',
      reject: action
    });
    
    expect(component['visible']).toBeTrue();

    component.onReject();
    
    expect(component['visible']).toBeFalse();
    expect(action.onClick).toHaveBeenCalledTimes(2);

    component.launch({
      message: '¿Deseas realmente eliminar los datos?',
      approved: action
    });
    
    expect(component['visible']).toBeTrue();

    component.onReject();
    
    expect(component['visible']).toBeFalse();
    expect(action.onClick).toHaveBeenCalledTimes(2);
  });
});
