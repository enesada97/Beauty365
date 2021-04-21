import { ProcessService } from "./../../../../../core/service/process.service";
import { ProcessGroup } from "./../../../../../core/models/processgroup.model";
import { Process } from "./../../../../../core/models/process.model";
import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-save-process-dialog",
  templateUrl: "./save-process-dialog.component.html",
  styleUrls: ["./save-process-dialog.component.sass"],
})
export class SaveProcessDialogComponent {
  action: string;
  processForm: FormGroup;
  process: Process;
  processGroups: ProcessGroup[];
  constructor(
    public dialogRef: MatDialogRef<SaveProcessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public processService: ProcessService,
    private fb: FormBuilder
  ) {
    this.action = data.action;
    if (this.action === "edit") {
      this.process = data.process;
    } else {
      this.process = new Process({});
    }
    this.processForm = this.createContactForm();
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.process.id],
      cost: [this.process.cost, [Validators.required]],
      doctorRatio: [this.process.doctorRatio],
      isLab: [this.process.isLab, [Validators.required]],
      isRad: [this.process.isRad, [Validators.required]],
      name: [this.process.name, [Validators.required]],
      processGroupId: [this.process.processGroupId, [Validators.required]],
      taxRatio: [this.process.taxRatio],
      unit: [this.process.unit],
      status: [this.process.status],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if (this.processForm.valid) {
      this.process = Object.assign({}, this.processForm.value);
      if (this.process.id == 0) {
        this.processService.add(this.process).subscribe((data) => {});
      } else {
        this.processService.update(this.process).subscribe((data) => {
          this.processService.isTblLoading = false;
        });
      }
    }
  }
}
