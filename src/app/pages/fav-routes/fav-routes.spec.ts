import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavRoutes } from './fav-routes';

describe('FavRoutes', () => {
  let component: FavRoutes;
  let fixture: ComponentFixture<FavRoutes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavRoutes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavRoutes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
