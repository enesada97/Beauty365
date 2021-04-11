import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionsRoutingModule } from './options-routing.module';
import { ProtocolTypeProcessesComponent } from './protocol-type-processes/protocol-type-processes.component';
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
import { SaveProtocolTypeProcessComponent } from './protocol-type-processes/dialog/save-protocol-type-process/save-protocol-type-process.component';
import { DeleteProtocolTypeProcessComponent } from './protocol-type-processes/dialog/delete-protocol-type-process/delete-protocol-type-process.component';
import { ProtocolTypeProcessService } from 'src/app/core/service/protocol-type-process.service';
import {MatListModule} from '@angular/material/list';
import { DepForDoctorsService } from 'src/app/core/service/depfordoctors.service';
import { InstitutionService } from 'src/app/core/service/institution.service';
import { ProcessInstitueService } from 'src/app/core/service/process-institue.service';
import { ProtocoltypeService } from 'src/app/core/service/protocoltype.service';
import { OptionalSettingsComponent } from './optional-settings/optional-settings.component';
import { OptionalSettingService } from 'src/app/core/service/optional-setting.service';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { CreatableFormComponent } from './creatable-form/creatable-form.component';
import { MatStepperModule } from "@angular/material/stepper";
import { DeleteComponent } from './creatable-form/dialog/delete/delete.component';
import { SaveComponent } from './creatable-form/dialog/save/save.component';
import { PreviewComponent } from './creatable-form/dialog/preview/preview.component';
import { FormFieldSelectionValueService } from 'src/app/core/service/form-field-selection-value.service';
import { FormFieldService } from 'src/app/core/service/form-field.service';
import { FormTableService } from 'src/app/core/service/form-table.service';
import { DetailTableComponent } from './creatable-form/detail-table/detail-table.component';
import { SaveFieldComponent } from './creatable-form/detail-table/dialog/save-field/save-field.component';
import { DeleteFieldComponent } from './creatable-form/detail-table/dialog/delete-field/delete-field.component';
import { SaveFieldValueComponent } from './creatable-form/detail-table/dialog/save-field-value/save-field-value.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslationService } from 'src/app/core/service/system-service/Translation.service';


@NgModule({
  declarations: [ProtocolTypeProcessesComponent, SaveProtocolTypeProcessComponent, DeleteProtocolTypeProcessComponent, OptionalSettingsComponent, CreatableFormComponent, DeleteComponent, SaveComponent, PreviewComponent, DetailTableComponent, SaveFieldComponent, DeleteFieldComponent, SaveFieldValueComponent],
  imports: [
    CommonModule,
    OptionsRoutingModule,
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
    MatListModule,
    MatSlideToggleModule,
    MatStepperModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          //useFactory:layoutHttpLoaderFactory,
          useClass: TranslationService,
          deps: [HttpClient]
      }
  })
  ],
  providers:[ProtocolTypeProcessService,ProcessInstitueService,InstitutionService,ProtocoltypeService,DepForDoctorsService,OptionalSettingService,FormTableService,
    FormFieldService,
    FormFieldSelectionValueService,]
})
export class OptionsModule { }
