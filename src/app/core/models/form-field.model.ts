export class FormField {
  id?: number;
  formTableId?: number;
  formControlName?: string;
  label?: string;
  type?: string;
  isOpen: boolean;
  constructor(formField) {
    {
      this.id = formField.id || 0;
      this.formTableId = formField.formTableId || null;
      this.label = formField.label || "";
      this.formControlName = formField.formControlName || "";
      this.type = formField.type || "";
      this.isOpen = formField.isOpen || true;
    }
  }
}
