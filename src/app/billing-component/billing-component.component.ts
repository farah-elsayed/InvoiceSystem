import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BillDialogComponent } from '../bill-dialog/bill-dialog.component';

@Component({
  selector: 'app-billing-component',
  templateUrl: './billing-component.component.html',
  styleUrls: ['./billing-component.component.css'],
})
export class BillingComponentComponent {
  billingForm: FormGroup;
  bills$: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    private db: AngularFireDatabase,
    public dialog: MatDialog
  ) {
    this.billingForm = this.fb.group({
      name: ['', Validators.required],
      unitsUsed: [0, [Validators.required, Validators.min(0)]],
    });

    this.bills$ = db
    .list('bills')
    .snapshotChanges()
    .pipe(
      map((changes) =>
        changes.map((c) => ({
          key: c.payload.key,
          ...(c.payload.val() as { name: string, unitsUsed: number, date: string, paid: boolean }),
        }))
      )
    );
  }

  onSubmit() {
    const { name, unitsUsed } = this.billingForm.value;

    this.db.list('bills').push({
      name,
      unitsUsed: +unitsUsed, // Convert string to number
      date: new Date().toISOString(),
      paid: false,
    });

    this.billingForm.reset();
  }

  markAsPaid(bill:any) {
    this.db.object(`bills/${bill.key}`).update({
      paid: true,
    });
  }

  openBillDialog() {
    this.dialog.open(BillDialogComponent);
  }
}