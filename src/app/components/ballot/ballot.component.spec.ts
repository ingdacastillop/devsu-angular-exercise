import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BallotComponent } from './ballot.component';

describe('BallotComponent', () => {
  let fixture: ComponentFixture<BallotComponent>;
  let component: BallotComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BallotComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BallotComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
