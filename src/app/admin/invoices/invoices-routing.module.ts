import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { AllInvoicesComponent } from './all-invoices/all-invoices.component';
import { DetailInvoiceComponent } from './detail-invoice/detail-invoice.component';

const routes: Routes = [
  {
    path: 'all-invoices',
    component: AllInvoicesComponent,
  },
  {
    path:"all-invoices/detail-invoice/:id",
    component:DetailInvoiceComponent
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
