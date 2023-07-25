import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ElectricityBillingSectionComponent } from './electricity-billing-section/electricity-billing-section.component';
import { PaymentProcessingComponent } from './payment-processing/payment-processing.component';
import { BillingComponentComponent } from './billing-component/billing-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BillDialogComponent } from './bill-dialog/bill-dialog.component';
import { ElectricityBillDialogComponent } from './electricity-bill-dialog/electricity-bill-dialog.component';
import { MatTableModule } from '@angular/material/table'; // Import MatTableModule
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { MatDialogModule } from '@angular/material/dialog'; // add this import
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    ElectricityBillingSectionComponent,
    PaymentProcessingComponent,
    BillingComponentComponent,
    BillDialogComponent,
    ElectricityBillDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HttpClientModule // Add the HttpClientModule to your imports array, 
    , 
    ReactiveFormsModule,
    BrowserAnimationsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatTableModule // Add MatTableModule to imports
    ,
    MatIconModule, // Add MatIconModule to imports
    MatDialogModule // add this import to your imports array
    ,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
