import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptantAuthComponent } from './adoptant-auth.component';

describe('AdoptantAuthComponent', () => {
  let component: AdoptantAuthComponent;
  let fixture: ComponentFixture<AdoptantAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptantAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptantAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
