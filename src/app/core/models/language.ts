export class Language {
  id?: number;
  name: string;
  code: string;
  constructor(language) {
    {
      this.id = language.id || 0;
      this.name = language.name || "";
      this.code = language.code || "";
    }
  }
}
