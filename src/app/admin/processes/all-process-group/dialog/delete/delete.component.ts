import { ProcessgroupService } from "./../../../../../core/service/processgroup.service";
import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SweetalertService } from "src/app/core/service/sweetalert.service";

@Component({
  selector: "app-delete",
  templateUrl: "./delete.component.html",
  styleUrls: ["./delete.component.sass"],
})
export class DeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public processgroupService: ProcessgroupService,
    private sweetAlert: SweetalertService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.data.status = false;
    this.processgroupService.update(this.data).subscribe((data) => {
      this.sweetAlert.delete(data.toString());
    });
  }
}
