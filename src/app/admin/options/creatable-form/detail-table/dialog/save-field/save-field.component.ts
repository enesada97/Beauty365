import { Component, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormField } from "src/app/core/models/form-field.model";
import { FormFieldService } from "src/app/core/service/form-field.service";

@Component({
  selector: "app-save-field",
  templateUrl: "./save-field.component.html",
  styleUrls: ["./save-field.component.sass"],
})
export class SaveFieldComponent {
  action: string;
  fieldForm: FormGroup;
  formField: FormField;
  formTableId: number;
  types = [
    { name: "Input", value: "input" },
    { name: "CheckBox", value: "radio" },
    { name: "DatePicker", value: "date" },
    { name: "SelectBox", value: "select" },
    { name: "TextArea", value: "textarea" },
  ];
  constructor(
    public dialogRef: MatDialogRef<SaveFieldComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formFieldService: FormFieldService,
    private fb: FormBuilder
  ) {
    this.action = data.action;
    this.formTableId = data.formTableId;
    if (this.action === "edit") {
      this.formField = data.formField;
    } else {
      this.formField = new FormField({});
      this.formField.formTableId = this.formTableId;
    }
    this.fieldForm = this.createTableContactForm();
  }
  createTableContactForm(): FormGroup {
    return this.fb.group({
      id: [this.formField.id],
      formTableId: [this.formField.formTableId],
      label: [this.formField.label, [Validators.required]],
      formControlName: [this.formField.formControlName],
      type: [this.formField.type, [Validators.required]],
      isOpen: [this.formField.isOpen],
    });
  }
  submit() {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if (this.fieldForm.valid) {
      this.formField = Object.assign({}, this.fieldForm.value);
      this.formField.formControlName = this.formField.label.toLocaleLowerCase();
      this.formField.formControlName = this.formField.formControlName.replace(
        /\s+/g,
        "_"
      );
      if (this.formField.id == 0) {
        this.formFieldService.add(this.formField).subscribe((data) => {
          this.dialogRef.close(data);
        });
      } else {
        this.formFieldService.update(this.formField).subscribe((data) => {
          this.dialogRef.close(1);
        });
      }
    }
  }
}
