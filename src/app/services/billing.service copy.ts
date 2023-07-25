import { Injectable } from '@angular/core';

export interface Bill {
  unitsUsed: number;
  totalBill: number;
  lastDateForPayment: Date;
  dueAmount: number;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class BillingService {
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

  storeBill(bill: Bill): void {
    // Implement the logic for storing the bill in the user's account
    // Use the userId property to identify the user's account
    // Store the bill as a password-protected file
  }
}