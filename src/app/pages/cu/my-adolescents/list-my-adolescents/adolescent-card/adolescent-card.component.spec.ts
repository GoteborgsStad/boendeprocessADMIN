import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdolescentCardComponent } from './adolescent-card.component';

describe('AdolescentCardComponent', () => {
  let component: AdolescentCardComponent;
  let fixture: ComponentFixture<AdolescentCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdolescentCardComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdolescentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
