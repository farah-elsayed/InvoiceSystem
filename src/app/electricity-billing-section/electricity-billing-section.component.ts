import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bill } from '../Bill/bill.interface';
import { BillingService } from 'src/app/services/billing.service';

@Component({
  selector: 'app-electricity-billing-section',
  templateUrl: './electricity-billing-section.component.html',
  styleUrls: ['./electricity-billing-section.component.css']
})
export class ElectricityBillingSectionComponent implements OnInit {
  billForm!: FormGroup;

  constructor(private fb: FormBuilder, private billingService: BillingService) {}

  ngOnInit(): void {
    this.billForm = this.fb.group({
      unitsUsed: ['', Validators.required],
      lastDateForPayment: ['', Validators.required]
    });
  }

  calculateBill() {
    const unitsUsed = this.billForm.value.unitsUsed;
    const lastDateForPayment = new Date(this.billForm.value.lastDateForPayment);
    const bill: Bill = this.billingService.calculateBill(unitsUsed, lastDateForPayment);
    this.billingService.storeBill(bill);
  }
}