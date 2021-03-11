import { InstitutionService } from './../../core/service/institution.service';
import { ProcessInstitueService } from './../../core/service/process-institue.service';
import { ProcessgroupService } from './../../core/service/processgroup.service';
import { ProcessService } from './../../core/service/process.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessesRoutingModule } from './processes-routing.module';
import { AllProcessesComponent } from './all-processes/all-processes.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
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
import { SaveProcessDialogComponent } from './all-processes/dialog/save-process-dialog/save-process-dialog.component';
import { AllProcessGroupComponent } from './all-process-group/all-process-group.component';
import { DeleteComponent } from './all-process-group/dialog/delete/delete.component';
import { FormDialogComponent } from './all-process-group/dialog/form-dialog/form-dialog.component';
import { InstitueProcessSaveComponent } from './institue-process-save/institue-process-save.component';
import { AddDialogComponent } from './institue-process-save/dialog/add-dialog/add-dialog.component';
import { DeleteDialogComponent } from './institue-process-save/dialog/delete-dialog/delete-dialog.component';
import { MatStepperModule } from "@angular/material/stepper";


@NgModule({
  declarations: [AllProcessesComponent, SaveProcessDialogComponent, AllProcessGroupComponent, DeleteComponent, FormDialogComponent, InstitueProcessSaveComponent, AddDialogComponent, DeleteDialogComponent],
  imports: [
    CommonModule,
    ProcessesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
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
    MatStepperModule
  ],
  providers: [ProcessService,ProcessgroupService,ProcessInstitueService,InstitutionService],
})
export class ProcessesModule { }
