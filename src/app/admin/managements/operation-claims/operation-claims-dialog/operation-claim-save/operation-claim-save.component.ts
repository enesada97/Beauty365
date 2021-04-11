import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OperationClaim } from 'src/app/core/models/operationclaim';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';
import { OperationClaimService } from 'src/app/core/service/system-service/operationclaim.service';

@Component({
  selector: 'app-operation-claim-save',
  templateUrl: './operation-claim-save.component.html',
  styleUrls: ['./operation-claim-save.component.sass']
})
export class OperationClaimSaveComponent{
  operationClaimForm: FormGroup;
  operationClaim: OperationClaim;
  constructor(
    public dialogRef: MatDialogRef<OperationClaimSaveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public operationClaimService: OperationClaimService,
    private fb: FormBuilder,
    private sweetAlert:SweetalertService
  ) {
      this.operationClaim = data.operationClaim;
   }

  ngOnInit(): void {
    this.operationClaimForm = this.createContactForm();
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.operationClaim.id],
      name: [this.operationClaim.name, [Validators.required]],
      alias: [this.operationClaim.alias, [Validators.required]],
      description: [this.operationClaim.description, [Validators.required]]
    });
  }
  public submit(){
    if (this.operationClaimForm.valid) {
      this.operationClaim = Object.assign({}, this.operationClaimForm.value);
        this.operationClaimService.update(this.operationClaim).subscribe(data=>{
          this.dialogRef.close(1);
          this.sweetAlert.success(data);
          }
          );
      }
    }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
