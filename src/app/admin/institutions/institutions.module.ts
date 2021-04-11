import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitutionsRoutingModule } from './institutions-routing.module';
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
import { InstitutionService } from 'src/app/core/service/institution.service';
import { AllInstitutionsComponent } from './all-institutions/all-institutions.component';
import { FormDialogComponent } from './all-institutions/dialog/form-dialog/form-dialog.component';
import { DeleteComponent } from './all-institutions/dialog/delete/delete.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslationService } from 'src/app/core/service/system-service/Translation.service';


@NgModule({
  declarations: [AllInstitutionsComponent,FormDialogComponent,DeleteComponent],
  imports: [
    CommonModule,
    InstitutionsRoutingModule,
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
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          //useFactory:layoutHttpLoaderFactory,
          useClass: TranslationService,
          deps: [HttpClient]
      }
  })
  ],
  providers: [InstitutionService],
})
export class InstitutionsModule { }
