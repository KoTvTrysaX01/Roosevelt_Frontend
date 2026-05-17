import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mapbox } from './mapbox';

describe('Mapbox', () => {
  let component: Mapbox;
  let fixture: ComponentFixture<Mapbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mapbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mapbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
