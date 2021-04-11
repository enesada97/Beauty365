import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Language } from 'src/app/core/models/language';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';
import { LanguageService } from 'src/app/core/service/system-service/language.service';

@Component({
  selector: 'app-language-save',
  templateUrl: './language-save.component.html',
  styleUrls: ['./language-save.component.sass']
})
export class LanguageSaveComponent{
  action: string;
  languageForm: FormGroup;
  language: Language;
  constructor(
    public dialogRef: MatDialogRef<LanguageSaveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public languageService: LanguageService,
    private fb: FormBuilder,
    private sweetAlert:SweetalertService
  ) {
    this.action = data.action;
    if (this.action === "edit") {
      this.language = data.language;
    } else {
      this.language = new Language({});
    }
    this.languageForm = this.createContactForm();
   }

  ngOnInit(): void {
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.language.id],
      name: [this.language.name, [Validators.required]],
      code: [this.language.code, [Validators.required]]
    });
  }
  public submit(){
    if (this.languageForm.valid) {
      this.language = Object.assign({}, this.languageForm.value);
      if(this.language.id==0){
        this.languageService.add(this.language).subscribe(data=>{
          this.dialogRef.close(1);
          this.sweetAlert.success(data);
          }
          );
      }else{
        this.languageService.update(this.language).subscribe(data=>{
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
