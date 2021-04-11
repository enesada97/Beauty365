import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LookUp } from 'src/app/core/models/LookUp';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';
import { LookUpService } from 'src/app/core/service/system-service/lookUp.service';
import { TranslateService } from 'src/app/core/service/system-service/translate.service';

@Component({
  selector: 'app-translate-delete',
  templateUrl: './translate-delete.component.html',
  styleUrls: ['./translate-delete.component.sass']
})
export class TranslateDeleteComponent {
  lookUps:LookUp[];
  lookUp:LookUp;
  constructor(
    public dialogRef: MatDialogRef<TranslateDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public translateService: TranslateService,
    private lookupService:LookUpService,
    private sweetAlert:SweetalertService
  ) {
    this.lookupService.getLanguageLookup().subscribe(data=>{
      this.lookUps=data;
      this.lookUp=this.findLookUp(this.data.langid);
    });
  }
  findLookUp(id:any){
    return this.lookUp=this.lookUps.find(m=>m.id==id);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.translateService.delete(this.data.id).subscribe((data) => {
      this.dialogRef.close(1);
      this.sweetAlert.delete(data.toString());
    });
  }
}

