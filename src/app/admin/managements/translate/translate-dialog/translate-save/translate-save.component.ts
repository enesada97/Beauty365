import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LookUp } from 'src/app/core/models/LookUp';
import { Translate } from 'src/app/core/models/translate';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';
import { LookUpService } from 'src/app/core/service/system-service/lookUp.service';
import { TranslateService } from 'src/app/core/service/system-service/translate.service';

@Component({
  selector: 'app-translate-save',
  templateUrl: './translate-save.component.html',
  styleUrls: ['./translate-save.component.sass']
})
export class TranslateSaveComponent{
  action: string;
  translateForm: FormGroup;
  translate: Translate;
  langugelookUp: LookUp[];
  constructor(
    public dialogRef: MatDialogRef<TranslateSaveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public translateService: TranslateService,
    private fb: FormBuilder,
    private lookupService: LookUpService,
    private sweetAlert:SweetalertService
  ) {
    this.action = data.action;
    if (this.action === "edit") {
      this.translate = data.translate;
    } else {
      this.translate = new Translate({});
    }
   }

  ngOnInit(): void {
    this.lookupService.getLanguageLookup().subscribe(data => {
			this.langugelookUp = data;
		});
    this.translateForm = this.createContactForm();
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.translate.id],
      langId: [this.translate.langId, [Validators.required]],
      code: [this.translate.code, [Validators.required]],
      value: [this.translate.value, [Validators.required]]
    });
  }
  public submit(){
    if (this.translateForm.valid) {
      this.translate = Object.assign({}, this.translateForm.value);
      if(this.translate.id==0){
        this.translateService.add(this.translate).subscribe(data=>{
          this.dialogRef.close(1);
          this.sweetAlert.success(data);
          }
          );
      }else{
        this.translateService.update(this.translate).subscribe(data=>{
          this.dialogRef.close(1);
          this.sweetAlert.info(data);
          }
          );
      }
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
