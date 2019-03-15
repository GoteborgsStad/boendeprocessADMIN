import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyListCardComponent } from './empty-list-card.component';

describe('EmptyListCardComponent', () => {
  let component: EmptyListCardComponent;
  let fixture: ComponentFixture<EmptyListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyListCardComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
