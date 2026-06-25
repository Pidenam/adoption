import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrphelinDetailComponent } from './orphelin-detail.component';

describe('OrphelinDetailComponent', () => {
  let component: OrphelinDetailComponent;
  let fixture: ComponentFixture<OrphelinDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrphelinDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrphelinDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
