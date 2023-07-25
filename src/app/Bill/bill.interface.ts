export interface Bill {
    id?: string;
    unitsUsed: number;
    totalBill: number;
    lastDateForPayment: Date;
    dueAmount: number;
    userId: string;
  }