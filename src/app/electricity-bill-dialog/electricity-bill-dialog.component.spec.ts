import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricityBillDialogComponent } from './electricity-bill-dialog.component';

describe('ElectricityBillDialogComponent', () => {
  let component: ElectricityBillDialogComponent;
  let fixture: ComponentFixture<ElectricityBillDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectricityBillDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectricityBillDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
