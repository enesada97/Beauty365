import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from 'src/app/core/models/appointment.model';
import { AppointmentService } from 'src/app/core/service/appointment.service';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteComponent{
  appointment=new Appointment({});
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public appointmentService: AppointmentService,
    private sweetAlert:SweetalertService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.appointmentService.getById(this.data.row.appointmentNo).subscribe(data=>{
      this.appointment=data;
      this.appointment.status=false;
      this.appointmentService.update(this.appointment).subscribe(ap=>{
        this.dialogRef.close(1);
        this.sweetAlert.delete(ap.toString());
      });
    });
}
}
