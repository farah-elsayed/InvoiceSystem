import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricityBillingSectionComponent } from './electricity-billing-section.component';

describe('ElectricityBillingSectionComponent', () => {
  let component: ElectricityBillingSectionComponent;
  let fixture: ComponentFixture<ElectricityBillingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectricityBillingSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectricityBillingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
