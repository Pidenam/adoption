import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrphelinsComponent } from './orphelins.component';

describe('OrphelinComponent', () => {
  let component: OrphelinsComponent;
  let fixture: ComponentFixture<OrphelinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrphelinsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrphelinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
