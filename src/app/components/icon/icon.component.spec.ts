import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from './icon.component';

describe('IconComponent', () => {
  let fixture: ComponentFixture<IconComponent>;
  let component: IconComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have these initial values', () => {
    expect(component.classIcon).toBe('icon-alert-circle');
  });

  it('should change class value for icon', () => {
    component.value = 'trash';

    expect(component.classIcon).toBe('icon-trash');
  });
});
