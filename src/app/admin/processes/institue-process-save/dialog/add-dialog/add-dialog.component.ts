import { Institution } from './../../../../../core/models/institution.model';
import { ProcessService } from './../../../../../core/service/process.service';
import { ProcessInstitueService } from './../../../../../core/service/process-institue.service';
import { ProcessgroupService } from './../../../../../core/service/processgroup.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProcessInstitueDto } from 'src/app/core/models/process-institue-dto.model';
import { ProcessInstitue } from 'src/app/core/models/process-institue.model';
import { Process } from 'src/app/core/models/process.model';
import { ProcessGroup } from 'src/app/core/models/processgroup.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { InstitutionService } from 'src/app/core/service/institution.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.sass']
})
export class AddDialogComponent implements OnInit {
  action: string;
  dialogTitle: string;
  processInstitueForm: FormGroup;
  processForm: FormGroup;
  processInstitue: ProcessInstitue;
  processGroups: ProcessGroup[];
  institutions:Institution[];
  process: Process;
  processInstitueDto:ProcessInstitueDto;
  isLinear = false;
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private processgroupService: ProcessgroupService,
    private processInstitueService: ProcessInstitueService,
    private institutionService:InstitutionService,
    private processService: ProcessService,
    private fb: FormBuilder,
  ) {
    this.action = data.action;
    if (this.action === "edit") {
      this.processInstitue = data.processInstitue;
      this.processService.getById(data.processId).subscribe(data=>this.process=data);
    } else {
      this.dialogTitle = "Yeni İşlem";
      this.processInstitue = new ProcessInstitue({});
      this.process = new Process({});
    }
    this.processInstitueForm = this.createContactForm();
    this.processForm = this.createFirstForm();
    }
    createFirstForm(): FormGroup {
      return this.fb.group({
        id: [this.process.id],
        name: [this.process.name, [Validators.required]],
        processGroupId:[this.process.processGroupId, [Validators.required]],
        doctorRatio:[this.process.doctorRatio],
        cost: [this.process.cost],
        isLab: [this.process.isLab, [Validators.required]],
        isRad: [this.process.isRad, [Validators.required]],
        status: [this.process.status],
        taxRatio: [this.process.taxRatio, [Validators.required]]
      })

    }
    createContactForm(): FormGroup {
      return this.fb.group({
        id: [this.processInstitue.id],
        institueId: [this.processInstitue.institueId, [Validators.required]],
        processId:[this.process.id],
        price:[this.processInstitue.price, [Validators.required]],
        tTBPercent: [this.processInstitue.tTBPercent],
        tTBFactor: [this.processInstitue.tTBFactor]
      });
    }
  ngOnInit(): void {
    this.processgroupService.getAll().subscribe((data)=>(this.processGroups=data));
    this.institutionService.getAll().subscribe((data)=>(this.institutions=data));
  }
  formControl = new FormControl("", [
    Validators.required,
    // Validators.email,
  ]);
  
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if (this.processForm.valid) {
      this.process = Object.assign({}, this.processForm.value);
      console.log(this.process);
      // this.patient.userId=this.authService.getCurrentUserId();
      this.processService.save(this.process).subscribe(data=>{
        if (this.processInstitueForm.valid) {
          this.processInstitue = Object.assign({}, this.processInstitueForm.value);  
          this.processInstitue.processId=data['id'];
          console.log(this.process)
          console.log(this.processInstitue)
          this.processInstitueService.save(this.processInstitue).subscribe(data=>{
            this.processInstitueService.isTblLoading=false;
          })
        }
        this.processService._sweetAlert.success(data['name']);
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
        );
    }
  }
}

