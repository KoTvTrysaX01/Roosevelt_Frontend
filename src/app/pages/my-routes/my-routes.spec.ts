import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRoutes } from './my-routes';

describe('MyRoutes', () => {
  let component: MyRoutes;
  let fixture: ComponentFixture<MyRoutes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRoutes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRoutes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
