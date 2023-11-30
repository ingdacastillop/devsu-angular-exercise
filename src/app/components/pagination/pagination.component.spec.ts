import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponentModule } from '../icon/icon.component.module';
import { PaginationComponent } from './pagination.component';
import { PaginationPipe } from './pagination.pipe';

describe('PaginationComponent', () => {
  let fixture: ComponentFixture<PaginationComponent>;
  let component: PaginationComponent;

  const countries = [
    'Colombia',
    'Ecuador',
    'Peru',
    'Venezuela',
    'Bolivia',
    'Brasil',
    'Paraguay',
    'Uruguay',
    'Argentina',
    'Chile'
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent],
      imports: [IconComponentModule],
      providers: [PaginationPipe]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have these initial values', () => {
    expect(component.isEmpty).toBeTrue();
    expect(component.isFirstPage).toBeFalse();
    expect(component.isLastPage).toBeFalse();
    expect(component.pages.length).toBe(0);
    expect(component.value.length).toBe(0);
  });

  it('', () => {
    const suggestions = new SimpleChange(null, countries, true);
    const count = new SimpleChange(null, 3, true);

    component.ngOnChanges({ count, suggestions });

    component.onClickFirst();
    component.onClickNext();

    component.onClickLast();
    component.onClickPrev();

    expect(component.pages.length).toBe(4);
  });
});
