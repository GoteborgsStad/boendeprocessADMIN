import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTemplateComponent } from './category-template.component';

describe('CategoryTemplateComponent', () => {
  let component: CategoryTemplateComponent;
  let fixture: ComponentFixture<CategoryTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryTemplateComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
