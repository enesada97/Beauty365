import { ProcessService } from './../../core/service/process.service';
import { WorkingService } from './../../core/service/working.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkingRoutingModule } from './working-routing.module';
import { WorkingProcessesComponent } from './working-processes/working-processes.component';
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
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableExporterModule } from "mat-table-exporter";
import { DeleteComponent } from './working-processes/dialog/delete/delete.component';
import { EditDialogComponent } from './working-processes/dialog/edit-dialog/edit-dialog.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddWorkingsDialogComponent } from './working-processes/dialog/add-workings-dialog/add-workings-dialog.component';
import {MatListModule} from '@angular/material/list';
import { ProcessgroupService } from 'src/app/core/service/processgroup.service';
import { AddCollectionsDialogComponent } from './working-processes/dialog/add-collections-dialog/add-collections-dialog.component';
import { FilterPipe } from 'src/app/core/pipe/filter.pipe';
import { CollectionService } from 'src/app/core/service/collection.service';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslationService } from 'src/app/core/service/system-service/Translation.service';
import { ProtocolService } from 'src/app/core/service/protocol.service';


@NgModule({
  declarations: [WorkingProcessesComponent, DeleteComponent, EditDialogComponent, AddWorkingsDialogComponent, AddCollectionsDialogComponent,FilterPipe],
  imports: [
    CommonModule,
    WorkingRoutingModule,
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
    MatTabsModule,
    MatTableExporterModule,
    MatMomentDateModule,
    MatExpansionModule,
    MatTooltipModule,
    MatListModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          //useFactory:layoutHttpLoaderFactory,
          useClass: TranslationService,
          deps: [HttpClient]
      }
  })
  ],
  providers: [WorkingService,ProcessService,ProcessgroupService,CollectionService,ProtocolService],
})
export class WorkingModule { }
