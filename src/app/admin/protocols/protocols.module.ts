import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProtocolsComponent } from './all-protocols/all-protocols.component';
import { AllProtocoltypesComponent } from './all-protocoltypes/all-protocoltypes.component';
import { ProtocoltypeService } from 'src/app/core/service/protocoltype.service';
import { ProtocolsRoutingModule } from './protocols-routing.module';
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
import { FormDialogComponent } from './all-protocoltypes/dialog/form-dialog/form-dialog.component';
import { DeleteComponent } from './all-protocoltypes/dialog/delete/delete.component';
import { ProtocolService } from 'src/app/core/service/protocol.service';
import { Delete2Component } from './all-protocols/dialog/delete2/delete2.component';
import { ProtocolTypeProcessService } from 'src/app/core/service/protocol-type-process.service';



@NgModule({
  declarations: [AllProtocolsComponent, AllProtocoltypesComponent,FormDialogComponent,DeleteComponent, Delete2Component],
  imports: [
    CommonModule,
    ProtocolsRoutingModule,
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
  ],
  providers:[ProtocoltypeService,ProtocolService,ProtocolTypeProcessService]
})
export class ProtocolsModule { }
