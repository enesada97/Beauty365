import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { InstitutionService } from 'src/app/core/service/institution.service';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass'],
})
export class DeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public institutionService: InstitutionService,
    private sweetAlert:SweetalertService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.data.status=false;
    this.institutionService.update(this.data).subscribe(
      (data) => {
        this.dialogRef.close(1);
        this.sweetAlert.delete(data.toString());
      },
    );
  }
}
