import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SweetalertService } from "src/app/core/service/sweetalert.service";
import { LanguageService } from "src/app/core/service/system-service/language.service";

@Component({
  selector: "app-language-delete",
  templateUrl: "./language-delete.component.html",
  styleUrls: ["./language-delete.component.sass"],
})
export class LanguageDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<LanguageDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public languageService: LanguageService,
    private sweetAlertService:SweetalertService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.languageService.delete(this.data.id).subscribe((data) => {
      this.dialogRef.close(1);
      this.sweetAlertService.delete(data.toString());
    });
  }
}
