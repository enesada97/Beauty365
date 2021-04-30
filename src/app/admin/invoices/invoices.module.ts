import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { AllInvoicesComponent } from './all-invoices/all-invoices.component';
import { DeleteInvoiceComponent } from './all-invoices/invoice-dialogs/delete-invoice/delete-invoice.component';
import { DetailInvoiceComponent } from './detail-invoice/detail-invoice.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSortModule } from "@angular/material/sort";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatRadioModule } from "@angular/material/radio";
import { MatMenuModule } from "@angular/material/menu";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MaterialFileInputModule } from "ngx-material-file-input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { NgxMaskModule } from 'ngx-mask';
import { MatProgressButtonsModule } from "mat-progress-buttons";
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslationService } from 'src/app/core/service/system-service/Translation.service';
import { InvoiceService } from 'src/app/core/service/invoice.service';
import { InvoiceDetailService } from 'src/app/core/service/invoice-detail.service';
import { PreviewInvoiceDetailsComponent } from './all-invoices/invoice-dialogs/preview-invoice-details/preview-invoice-details.component';
import { DeleteInvoiceDetailComponent } from './all-invoices/invoice-dialogs/preview-invoice-details/invoice-detail-dialog/delete-invoice-detail/delete-invoice-detail.component';


@NgModule({
  declarations: [AllInvoicesComponent, DeleteInvoiceComponent, DetailInvoiceComponent, PreviewInvoiceDetailsComponent, DeleteInvoiceDetailComponent],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatSelectModule,
    MatRadioModule,
    MatMenuModule,
    MatCheckboxModule,
    MaterialFileInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    NgxMaskModule,
    MatProgressButtonsModule,
    MatMomentDateModule,
    MatTabsModule,
    MatExpansionModule,
    MatListModule,
    MatCardModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          //useFactory:layoutHttpLoaderFactory,
          useClass: TranslationService,
          deps: [HttpClient]
      }
  })
  ],
  providers:[InvoiceService,InvoiceDetailService]
})
export class InvoicesModule { }
