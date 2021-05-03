import { Institution } from "./../../../../../core/models/institution.model";
import { ProcessService } from "./../../../../../core/service/process.service";
import { ProcessInstitueService } from "./../../../../../core/service/process-institue.service";
import { ProcessgroupService } from "./../../../../../core/service/processgroup.service";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProcessInstitueDto } from "src/app/core/models/process-institue-dto.model";
import { ProcessInstitue } from "src/app/core/models/process-institue.model";
import { Process } from "src/app/core/models/process.model";
import { ProcessGroup } from "src/app/core/models/processgroup.model";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { InstitutionService } from "src/app/core/service/institution.service";
import { SweetalertService } from "src/app/core/service/sweetalert.service";

@Component({
  selector: "app-add-dialog",
  templateUrl: "./add-dialog.component.html",
  styleUrls: ["./add-dialog.component.sass"],
})
export class AddDialogComponent implements OnInit {
  action: string;
  processInstitueForm: FormGroup;
  processForm: FormGroup;
  processInstitue: ProcessInstitue;
  processGroups: ProcessGroup[];
  institutions: Institution[];
  process: Process;
  processInstitueDto: ProcessInstitueDto;
  isLinear = false;
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private processgroupService: ProcessgroupService,
    private processInstitueService: ProcessInstitueService,
    private institutionService: InstitutionService,
    private processService: ProcessService,
    private fb: FormBuilder,
    private sweetAlert: SweetalertService
  ) {
    this.action = data.action;
    if (this.action === "edit") {
      this.processInstitue = new ProcessInstitue({});
      this.processInstitueService
        .getById(data.processInstitueDto.processInstitueNo)
        .subscribe((pr) => {
          this.processInstitue = pr;
          this.process = new Process({});
          this.processService
            .getById(data.processInstitueDto.processNo)
            .subscribe((data) => {
              this.process = data;
              this.processInstitueForm = this.createContactForm();
              this.processForm = this.createFirstForm();
            });
        });
    } else {
      this.processInstitue = new ProcessInstitue({});
      this.process = new Process({});
      this.processInstitueForm = this.createContactForm();
      this.processForm = this.createFirstForm();
    }
  }
  createFirstForm(): FormGroup {
    return this.fb.group({
      id: [this.process.id],
      name: [this.process.name, [Validators.required]],
      processGroupId: [this.process.processGroupId, [Validators.required]],
      doctorRatio: [this.process.doctorRatio],
      cost: [this.process.cost],
      isLab: [this.process.isLab, [Validators.required]],
      isRad: [this.process.isRad, [Validators.required]],
      status: [this.process.status],
      taxRatio: [this.process.taxRatio, [Validators.required]],
    });
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.processInstitue.id],
      institueId: [this.processInstitue.institueId, [Validators.required]],
      processId: [this.process.id],
      price: [this.processInstitue.price, [Validators.required]],
      tTBPercent: [this.processInstitue.tTBPercent],
      tTBFactor: [this.processInstitue.tTBFactor],
    });
  }
  ngOnInit(): void {
    this.processgroupService
      .getList()
      .subscribe((data) => (this.processGroups = data));
    this.institutionService
      .getList()
      .subscribe((data) => (this.institutions = data));
  }
  public submit() {
    if (this.processForm.valid) {
      this.process = Object.assign({}, this.processForm.value);
      if (this.process.id == 0) {
        this.processService.add(this.process).subscribe((data) => {
          if (this.processInstitueForm.valid) {
            this.processInstitue = Object.assign(
              {},
              this.processInstitueForm.value
            );
            this.processInstitue.processId = JSON.parse(data).data.id;
            if (this.processInstitue.id == 0) {
              this.processInstitueService
                .add(this.processInstitue)
                .subscribe((data) => {
                  this.dialogRef.close(1);
                  this.sweetAlert.success(data);
                });
            } else {
              this.processInstitueService
                .update(this.processInstitue)
                .subscribe((data) => {
                  this.dialogRef.close(1);
                  this.sweetAlert.info(data);
                });
            }
          }
        });
      } else {
        this.processService.update(this.process).subscribe((data) => {
          if (this.processInstitueForm.valid) {
            this.processInstitue = Object.assign(
              {},
              this.processInstitueForm.value
            );
            this.processInstitue.processId = this.process.id;
            if (this.processInstitue.id == 0) {
              this.processInstitueService
                .add(this.processInstitue)
                .subscribe((data) => {
                  this.dialogRef.close(1);
                  this.sweetAlert.success(data);
                });
            } else {
              this.processInstitueService
                .update(this.processInstitue)
                .subscribe((data) => {
                  this.dialogRef.close(1);
                  this.sweetAlert.info(data);
                });
            }
          }
        });
      }
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
