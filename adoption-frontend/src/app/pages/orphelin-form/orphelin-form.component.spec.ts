import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrphelinFormComponent } from './orphelin-form.component';

describe('OrphelinFormComponent', () => {
  let component: OrphelinFormComponent;
  let fixture: ComponentFixture<OrphelinFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrphelinFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrphelinFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
