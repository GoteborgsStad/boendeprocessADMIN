import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAdolescentListComponent } from './contact-adolescent-list.component';

describe('ContactAdolescentListComponent', () => {
  let component: ContactAdolescentListComponent;
  let fixture: ComponentFixture<ContactAdolescentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactAdolescentListComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactAdolescentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
