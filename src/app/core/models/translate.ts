export class Translate{
    id?:number;
    langId?:number;
code?:string;
value?:string;
  constructor(translate) {
    this.id=translate.id||0;
    this.langId=translate.langId||null;
    this.code=translate.code||'';
    this.value=translate.value||'';

  }
}
