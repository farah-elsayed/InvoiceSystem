import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Observable } from 'rxjs';
import { Bill } from '../Bill/bill.interface'; 

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  constructor(private firebaseService: FirebaseService) {}

  calculateBill(unitsUsed: number, lastDateForPayment: Date): Bill {
    const unitRate = 5; // rate per unit of electricity
    const fixedCharge = 50; // fixed monthly charge
    const lateFee = 10; // late fee charge per day after last date for payment

    // Calculate the total bill based on the units used and add the fixed monthly charge
    let billAmount = (unitsUsed * unitRate) + fixedCharge;

    // Calculate the number of days between today and the last date for payment
    const today = new Date();
    const lastDate = lastDateForPayment;
    const daysLate = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

    // If the bill is paid after the last date for payment, add a late fee
    if (daysLate > 0) {
      const lateFeeAmount = daysLate * lateFee;
      billAmount += lateFeeAmount;
    }

    // Return the bill as a Bill object
    return {
      unitsUsed: unitsUsed,
      totalBill: billAmount,
      lastDateForPayment: lastDateForPayment,
      dueAmount: daysLate > 0 ? daysLate * lateFee : 0,
      userId: '123' // Set the user ID here, or pass it in as a parameter
    };
  }

  getBills(): Observable<Bill[]> {
    return this.firebaseService.getBills();
  }

  getBillById(id: string): Observable<Bill> {
    return this.firebaseService.getBillById(id);
  }

  storeBill(bill: Bill): Observable<string> {
    return this.firebaseService.addBill(bill);
  }

  updateBill(bill: Bill): Observable<void> {
    return this.firebaseService.updateBill(bill);
  }

  deleteBill(id: string): Observable<void> {
    return this.firebaseService.deleteBill(id);
  }
}