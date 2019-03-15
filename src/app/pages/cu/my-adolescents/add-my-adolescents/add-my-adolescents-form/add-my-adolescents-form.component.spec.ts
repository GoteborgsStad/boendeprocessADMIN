import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMyAdolescentsFormComponent } from './add-my-adolescents-form.component';

describe('AddMyAdolescentsFormComponent', () => {
  let component: AddMyAdolescentsFormComponent;
  let fixture: ComponentFixture<AddMyAdolescentsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMyAdolescentsFormComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMyAdolescentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
