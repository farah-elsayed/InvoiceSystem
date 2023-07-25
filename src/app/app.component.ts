import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FirebaseService } from './services/firebase.service';
import { BillingService } from './services/billing.service';
import { BillDialogComponent } from './bill-dialog/bill-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  bills: any[];
  billForm: FormGroup = new FormGroup({});  editing = false;
  selectedBill: any;

  constructor(
    private firebaseService: FirebaseService,
    private billingService: BillingService,
    private formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog
  ) {
    this.bills = [];
  }

  ngOnInit() {
    this.billForm = this.formBuilder.group({
      name: ['', Validators.required],
      unitsUsed: ['', Validators.required],
      amount: ['', Validators.required],
      lastPaymentDate: ['', Validators.required],
      paid: false
    });
    this.getBills();
  }

  getBills() {
    this.firebaseService.getBills().subscribe((bills) => {
      this.bills = bills.map((bill) => ({
        id: bill.key,
        ...bill.payload.val()
      }));
    });
  }

  addBill() {
    const bill = this.billForm.value;
    this.billingService.storeBill(bill).subscribe(() => {
      this.billForm.reset();
      this.getBills();
    });
  }

  editBill(bill: any) {
    this.billForm.patchValue(bill);
    this.editing = true;
  }

  updateBill() {
    const bill = this.billForm.value;
    this.billingService.updateBill(bill).subscribe(() => {
      this.billForm.reset();
      this.editing = false;
      this.getBills();
    });
  }

  deleteBill(billId: string) {
    this.billingService.deleteBill(billId).subscribe(() => {
      this.getBills();
    });
  }

  submitForm() {
    if (this.billForm.invalid) {
      return;
    }

    if (this.editing) {
      this.updateBill();
    } else {
      this.addBill();
    }
  }

  cancelEdit() {
    this.billForm.reset();
    this.editing = false;
  }

  getTotal() {
    return this.bills.reduce((total, bill) => total + bill.amount, 0);
  }
  onNoClick(): void {
    this.dialog.closeAll();
  }
  openBillDialog(bill: any) {
    this.selectedBill = bill;
    const dialogRef = this.dialog.open(BillDialogComponent, {
      width: '350px',
      data: bill
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}