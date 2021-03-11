import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DoctorsRoutingModule } from "./doctors-routing.module";
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
import { NgxMaskModule } from "ngx-mask";
import { AddDoctorComponent } from "./add-doctor/add-doctor.component";
import { AllDoctorsComponent } from "./all-doctors/all-doctors.component";
import { EditDoctorComponent } from "./edit-doctor/edit-doctor.component";
import { DoctorDetailComponent } from "./doctor-detail/doctor-detail.component";
import { DeleteComponent } from "./all-doctors/dialog/delete/delete.component";
import { FormDialogComponent } from "./all-doctors/dialog/form-dialog/form-dialog.component";
import { DepForDoctorsService } from 'src/app/core/service/depfordoctors.service';
import { DepartmentService } from 'src/app/core/service/department.service';

@NgModule({
  declarations: [
    AddDoctorComponent,
    AllDoctorsComponent,
    EditDoctorComponent,
    DoctorDetailComponent,
    DeleteComponent,
    FormDialogComponent,
  ],
  imports: [
    CommonModule,
    DoctorsRoutingModule,
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
  ],
  providers: [DepForDoctorsService,DepartmentService],
})
export class DoctorsModule {}
