import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from '../Bill/bill.interface';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  // Define your Firebase Realtime Database URL and other configuration details here
  private readonly firebaseUrl = 'https://billsys-18115-default-rtdb.firebaseio.com/';
  private readonly billsUrl = `${this.firebaseUrl}/bills.json`;

  constructor(private http: HttpClient) {}

  getBills(): Observable<any[]> {
    return this.http.get<any[]>(this.billsUrl);
  }

  addBill(bill: any): Observable<any> {
    return this.http.post<any>(this.billsUrl, bill);
  }

  updateBill(bill: any): Observable<any> {
    const billUrl = `${this.firebaseUrl}/bills/${bill.id}.json`;
    return this.http.put<any>(billUrl, bill);
  }

  deleteBill(billId: string): Observable<any> {
    const billUrl = `${this.firebaseUrl}/bills/${billId}.json`;
    return this.http.delete<any>(billUrl);
  }
  getBillById(id: string): Observable<Bill> {
    const billUrl = `${this.firebaseUrl}/bills/${id}.json`;
    return this.http.get<Bill>(billUrl);
  }
}