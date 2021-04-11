export class FormFieldSelectionValue {
  id?: number;
  formFieldId?: number;
  value?:string;
  constructor(formFieldSelectionValue) {
    {
      this.id = formFieldSelectionValue.id || 0;
      this.formFieldId = formFieldSelectionValue.formFieldId || null;
      this.value = formFieldSelectionValue.value || '';
    }
  }
}

