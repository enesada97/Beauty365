import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { OptionalSetting } from 'src/app/core/models/optional-setting.model';
import { OptionalSettingService } from 'src/app/core/service/optional-setting.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-optional-settings',
  templateUrl: './optional-settings.component.html',
  styleUrls: ['./optional-settings.component.sass']
})
export class OptionalSettingsComponent implements OnInit {
  optionalSettings:OptionalSetting[]=[];
  optionalSettingsForm: FormGroup;
  constructor(private optionalSettingService:OptionalSettingService,private fb: FormBuilder) {
      this.optionalSettingsForm = this.fb.group({
        id: this.fb.array([
        ]),
        alias: this.fb.array([
        ]),
        key: this.fb.array([
        ]),
        isOpen: this.fb.array([
        ]),
      })
  }
  ngOnInit(): void {
    this.getSettings();
  }
  getOptionsForms( optionalSettings:OptionalSetting[]): void {
    for (let i = 0; i < optionalSettings.length; i++) {
      const element = optionalSettings[i];
      (this.optionalSettingsForm.get('id') as FormArray).push(
        this.fb.control(element.id)
      );
      (this.optionalSettingsForm.get('alias') as FormArray).push(
        this.fb.control(element.alias)
      );
      (this.optionalSettingsForm.get('key') as FormArray).push(
        this.fb.control(element.key)
      );
      (this.optionalSettingsForm.get('isOpen') as FormArray).push(
        this.fb.control(element.isOpen)
      );
    }
  }
  getSettings(){
    this.optionalSettingService.getAll().subscribe(data=>{
      this.optionalSettings=data;
    this.getOptionsForms(this.optionalSettings);
    })
  }
  getIsOpensFormControls(): AbstractControl[] {
    return (<FormArray> this.optionalSettingsForm.get('isOpen')).controls
  }
public onFormSubmit(): void {
    if (this.optionalSettingsForm.valid) {
      let optionalSettings:OptionalSetting[] = Object.assign({}, this.optionalSettingsForm.value);
      console.log(this.optionalSettings);
    }
  }
  passParameter() {
    if (this.optionalSettingsForm.valid) {
      let optionalSettings:OptionalSetting[] = Object.assign({}, this.optionalSettingsForm.value);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Varsayılan ayarlarınızı güncellemek istediğinize emin misiniz?",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Evet ",
        cancelButtonText: " Hayır",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          for (let i = 0; i < optionalSettings.length; i++) {
            const element = optionalSettings[i];
            console.log(element);
            this.optionalSettingService.save(element).subscribe(opt=>{

            });
          }
          swalWithBootstrapButtons.fire("Değişiklikler Kaydedildi", "", "success");
        }
      });
  }
}
}
