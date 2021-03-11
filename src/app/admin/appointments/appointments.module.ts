import { DepForDoctorsService } from 'src/app/core/service/depfordoctors.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AllAppointmentsComponent } from './all-appointments/all-appointments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskModule } from 'ngx-mask';
import { MatProgressButtonsModule } from 'mat-progress-buttons';
import { AppointmentService } from 'src/app/core/service/appointment.service';
import { AddAppointmentDialogComponent } from './all-appointments/add-appointment-dialog/add-appointment-dialog.component';
import { DeleteComponent } from './all-appointments/delete/delete.component';
import { ProtocoltypeService } from 'src/app/core/service/protocoltype.service';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { AddAppointmentListComponent } from './add-appointment-list/add-appointment-list.component';
import { DepartmentService } from 'src/app/core/service/department.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OptionalSettingService } from 'src/app/core/service/optional-setting.service';

@NgModule({
  declarations: [AllAppointmentsComponent, AddAppointmentDialogComponent, DeleteComponent, AddAppointmentListComponent],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
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
    MatExpansionModule,
    MatTooltipModule
  ],
  providers: [ProtocoltypeService,AppointmentService,DepForDoctorsService,DepartmentService,OptionalSettingService],
})
export class AppointmentsModule { }
