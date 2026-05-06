import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testapi } from './testapi';

describe('Testapi', () => {
  let component: Testapi;
  let fixture: ComponentFixture<Testapi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testapi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Testapi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
