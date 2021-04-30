import { ProtocolService } from 'src/app/core/service/protocol.service';
import { ErrorHandler, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PatientsRoutingModule } from "./patients-routing.module";
import { AllPatientsComponent, PhonePipe } from "./all-patients/all-patients.component";
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
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { PatientService } from "src/app/core/service/patient.service";
import { MatIconModule } from "@angular/material/icon";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DeleteComponent } from "./all-patients/dialog/delete/delete.component";
import { FormDialogComponent } from "./all-patients/dialog/form-dialog/form-dialog.component";
import { AddPatientComponent } from "./add-patient/add-patient.component";
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { NgxMaskModule } from 'ngx-mask';
import { SearchPatientComponent } from './search-patient/search-patient.component';
import { AddProtocolDialogComponent } from './search-patient/add-protocol-dialog/add-protocol-dialog.component';
import { MatProgressButtonsModule } from "mat-progress-buttons";
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { NoteForPatientComponent } from './all-patients/dialog/note-for-patient/note-for-patient.component';
import { DetailPatientComponent } from './detail-patient/detail-patient/detail-patient.component';
import {MatListModule} from '@angular/material/list';
import { MedicalAlertService } from "src/app/core/service/medical-alert.service";
import { MedicalAlertComponent } from './detail-patient/detail-patient/dialog/medical-alert/medical-alert.component';
import { AppointmentService } from "src/app/core/service/appointment.service";
import { MedicalService } from 'src/app/core/service/medical.service';
import {MatCardModule} from '@angular/material/card';
import { CollectionService } from 'src/app/core/service/collection.service';
import { ProtocolTypeProcessService } from 'src/app/core/service/protocol-type-process.service';
import { WorkingService } from 'src/app/core/service/working.service';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslationService } from 'src/app/core/service/system-service/Translation.service';
import { InvoiceService } from 'src/app/core/service/invoice.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OptionalSettingService } from 'src/app/core/service/optional-setting.service';

@NgModule({
  declarations: [
    AllPatientsComponent,
    AddPatientComponent,
    DeleteComponent,
    FormDialogComponent,
    EditPatientComponent,
    SearchPatientComponent,
    AddProtocolDialogComponent,
    PhonePipe,
    NoteForPatientComponent,
    DetailPatientComponent,
    MedicalAlertComponent
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
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
    MatTooltipModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          //useFactory:layoutHttpLoaderFactory,
          useClass: TranslationService,
          deps: [HttpClient]
      }
  })
  ],
  providers: [PatientService,InvoiceService,MedicalAlertService,AppointmentService,ProtocolService,MedicalService,CollectionService,WorkingService,ProtocolTypeProcessService,OptionalSettingService],
})
export class PatientsModule {}
