export class Translate{
    id?:number;
langid?:number;
code?:string;
value?:string;
  constructor(translate) {
    this.id=translate.id||0;
    this.langid=translate.langid||null;
    this.code=translate.code||'';
    this.value=translate.value||'';

  }
}
