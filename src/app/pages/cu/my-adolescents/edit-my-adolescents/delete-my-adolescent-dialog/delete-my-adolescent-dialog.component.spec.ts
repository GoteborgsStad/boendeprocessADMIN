import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMyAdolescentDialogComponent } from './delete-my-adolescent-dialog.component';

describe('DeleteMyAdolescentDialogComponent', () => {
  let component: DeleteMyAdolescentDialogComponent;
  let fixture: ComponentFixture<DeleteMyAdolescentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteMyAdolescentDialogComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMyAdolescentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
