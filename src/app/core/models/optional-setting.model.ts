export class OptionalSetting {
  id?: number;
  alias?: string;
  key?: string;
  isOpen: boolean;
  constructor(optionalSetting) {
    {
      this.id = optionalSetting.id || 0;
      this.alias = optionalSetting.alias || "";
      this.key = optionalSetting.key || "";
      this.isOpen = optionalSetting.isOpen || false;
    }
  }
}
