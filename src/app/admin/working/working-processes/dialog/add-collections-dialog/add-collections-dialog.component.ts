import { CollectionService } from "src/app/core/service/collection.service";
import { SelectionModel } from "@angular/cdk/collections";
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Collection } from "src/app/core/models/collection.model";
import { Working } from "src/app/core/models/working.model";
import { WorkingDto } from "src/app/core/models/workingdto.model";
import { WorkingService } from "src/app/core/service/working.service";
import { AddWorkingsDialogComponent } from "../add-workings-dialog/add-workings-dialog.component";
import Swal from "sweetalert2";
import { FormControl, Validators } from "@angular/forms";
import { MatExpansionPanel } from "@angular/material/expansion";
import { AuthService } from "src/app/core/service/system-service/auth.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-add-collections-dialog",
  templateUrl: "./add-collections-dialog.component.html",
  styleUrls: ["./add-collections-dialog.component.sass"],
})
export class AddCollectionsDialogComponent implements OnInit {
  @ViewChild('panel2') firstPanel: MatExpansionPanel;
  displayedCollections = [
    "select",
    "groupName",
    "processName",
    "price",
    "actions",
  ];
  displayedCollectionsBeforePayment = [
    "paymentType",
    "discount",
    "paymentValue",
    "actions",
  ];
  formControl: FormControl;
  formControlForDiscount: FormControl;
  formControlForDiscountPrice: FormControl;
  formControlForDiscountLatestPrice: FormControl;
  collection: Collection;
  collections: Collection[] = [];
  selectedPay: number = 0;
  reminderTotal: number = 0;
  selectedPays: number[] = [];
  selectedId: number[] = [];
  selection = new SelectionModel<WorkingDto>(true, []);
  protocolId: number;
  dialogTitle: string;
  workingForCollectionDtos: WorkingDto[];
  selectedPayForCollection: any[] = [];
  selectedPayType: any = undefined;
  clickDiscount: boolean = false;
  saleValue: number = undefined;
  discount: number = undefined;
  id: any;
  workingForCollection: Working;
  totalPrice: number;
  arrears: number = 0;
  addPay: number;
  latestPrice: number = undefined;
  discountFinder: number = undefined;
  discountValue:number=undefined;
  discountValueArray:number[]=[];
  userName:string;
  constructor(
    public dialogRef: MatDialogRef<AddWorkingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public workingService: WorkingService,
    public collectionService: CollectionService,
    private authService:AuthService,
    private translate:TranslateService
  ) {
    this.workingForCollectionDtos = data.workingForCollectionDtos;
    this.protocolId = data.protocolId;
    this.selectedPayType = "1";
    this.getUserName();
  }
  dataSource: MatTableDataSource<WorkingDto>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;

  dataSourceForCollection: MatTableDataSource<Collection>;
  @ViewChild(MatPaginator, { static: false }) paginatorAdd: MatPaginator;

  ngOnInit(): void {
    this.getCollections();
    this.totalPrice = this.selectedPay;
  }
  getUserName(){
    this.userName=this.authService.getUserName();
  }
  getCollections() {
    this.dataSource = new MatTableDataSource<WorkingDto>(
      this.workingForCollectionDtos
    );
    setTimeout(() => (this.dataSource.sort = this.sort));
    setTimeout(() => (this.dataSource.paginator = this.paginator));
    this.dataSource.data.forEach((row) => this.selection.select(row));
    for (let i = 0; i < this.selection.selected.length; i++) {
      if (this.selection.selected[i].arrearsValue != 0) {
        this.selectedId[i] = this.selection.selected[i].workingNo;
        this.selectedPays[i] = this.selection.selected[i].arrearsValue;
        this.selectedPays[i]=Math.round(this.selectedPays[i]*100)/100;
        this.selectedPay = this.selectedPay + this.selectedPays[i];
        this.addPay = this.selectedPay;
        this.arrears = this.selectedPay;
      }
    }
    this.formControl = new FormControl("", [Validators.max(this.arrears),Validators.min(1)]);
    this.formControlForDiscount = new FormControl("", [
      Validators.max(100),
      Validators.min(1),
    ]);
    this.formControlForDiscountPrice = new FormControl("", [
      Validators.max(this.arrears),
    ]);
    this.formControlForDiscountLatestPrice = new FormControl("", [
      Validators.max(this.arrears),
    ]);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    if (this.isAllSelected()) {
      this.selectedPay = 0;
      this.arrears = 0;
      this.selectedPays = [];
      this.selection.clear();
    } else {
      this.selectedPay = 0;
      this.arrears = 0;
      this.selectedPays = [];
      this.dataSource.data.forEach((row) => {
        if (!this.selection.isSelected(row)) {
          this.selection.select(row);
        }
      });
      this.selection.selected.sort(function (a, b) {
        return a.workingNo - b.workingNo;
      });
      for (let i = 0; i < this.selection.selected.length; i++) {
        if (
          this.selection.selected[i].arrearsValue != 0 &&
          (this.selectedPays[i] != 0 || this.selectedPays != undefined)
        ) {
          this.selectedPays[i] = this.selection.selected[i].arrearsValue;
          this.selectedId[i] = this.selection.selected[i].workingNo;
          this.selectedPay = this.selectedPay + this.selectedPays[i];
          this.arrears = this.selectedPay;
        }
      }
    }
    this.deleteAllPayments();
    this.formControl = new FormControl("", [Validators.max(this.arrears),Validators.min(1)]);
  }
  singleSelectRow(event, row) {
    this.id = row.id; //5,2
    let arrearsValue = row.arrearsValue;
    let firstDataId = this.dataSource.data[0].workingNo;
    let findIndex = this.selectedId.findIndex((m) => m == this.id);
    if (!event.checked) {
      this.selectedPays[findIndex] = 0;
    } else {
      this.selectedPays[findIndex] = arrearsValue;
    }
    this.deleteAllPayments();
    this.onChange();
    this.formControl = new FormControl("", [Validators.max(this.arrears),Validators.min(1)]);
  }
  onChangeFirst(row){
    if(!this.selection.isSelected(row)){
      this.selection.select(row);
    }
    this.onChange();
  }
  onChange() {
    for (let i = 0; i < this.selectedPays.length; i++) {
     this.selectedPays[i]=Math.round(this.selectedPays[i]*100)/100;
    }
    this.selectedPay = this.selectedPays.reduce((a, b) => a + b, 0);
    if (Number.isNaN(this.selectedPay)) {
      this.selectedPay=0;
      this.selectedPays.forEach(m=>{
        m>0?this.selectedPay=this.selectedPay+m:null
      })
    }
    this.addPay = this.selectedPay;
    this.arrears = undefined;
    this.arrears = this.selectedPay;
  }
  addDiscount() {
    this.deleteAllPayments();
    this.clickDiscount = true;
    const totalLength = this.selectedPays.length;
    let count = 0;
    for (let y = 0; y < this.selectedPays.length; y++) {
      if (this.selectedPays[y] != undefined && this.selectedPays[y] != 0) {
        count++;
      }
    }
    // const totalLength = this.selection.selected.length;
    if (this.discount != undefined && this.discount > 0) {
      for (let i = 0; i < totalLength; i++) {
        if (this.selectedPays[i] != undefined && this.selectedPays[i] != 0) {
          this.discountValueArray[i]=this.selectedPays[i]-this.selectedPays[i] * ((100 - this.discount) / 100);
          this.selectedPays[i] =
            this.selectedPays[i] * ((100 - this.discount) / 100);
        }
      }
    } else if (this.latestPrice != undefined && this.latestPrice > 0) {
      this.discountFinder = this.selectedPay - this.latestPrice;
      this.discountValue = this.discountFinder / count;
      for (let i = 0; i < totalLength; i++) {
        if (this.selectedPays[i] != undefined && this.selectedPays[i] != 0) {
          this.selectedPays[i] = this.selectedPays[i] - this.discountValue;
          if (this.selectedPays[i] < 0) {
            this.selectedPays[i + 1] =
              this.selectedPays[i + 1] + this.selectedPays[i];
            this.selectedPays[i] = 0;
          }
        }
      }
    } else {
      if (this.saleValue != undefined && this.saleValue > 0) {
        this.discountValue = this.saleValue / count;
        for (let i = 0; i < totalLength; i++) {
          if (this.selectedPays[i] != undefined && this.selectedPays[i] != 0) {
            this.selectedPays[i] = this.selectedPays[i] - this.discountValue;
            if (this.selectedPays[i] < 0) {
              this.selectedPays[i + 1] =
                this.selectedPays[i + 1] + this.selectedPays[i];
              this.selectedPays[i] = 0;
            }
          }
        }
      }
    }
    this.onChange();
    this.formControl = new FormControl("", [Validators.max(this.arrears),Validators.min(1)]);
  }
  deleteDiscount() {
    this.clickDiscount = false;
    const totalLength = this.selectedPays.length;
    if (this.discount != undefined && this.discount > 0) {
      this.reminderTotal = this.selectedPay;
      for (let i = 0; i < totalLength; i++) {
        this.selectedPays[i] =
          this.selectedPays[i] / ((100 - this.discount) / 100);
      }
      this.discount = undefined;
    } else if (this.latestPrice > 0) {
      this.refresh();
    } else {
      if (this.saleValue > 0) {
        this.refresh();
      }
    }
    this.toggleFirstPanel();
    this.onChange();
    this.formControl = new FormControl("", [Validators.max(this.arrears),Validators.min(1)]);
  }
  refresh() {
    this.discount = undefined;
    this.saleValue = undefined;
    this.latestPrice = undefined;
    this.selectedPays = [];
    this.selectedId = [];
    this.selectedPay = 0;
    this.arrears = undefined;
    this.getCollections();
  }
  addPayment() {
    this.collection = new Collection({});
    // this.collection.addedBy = this.userName;
    this.collection.addedBy = '';
    this.collection.addedDate = new Date();
    this.collection.discount = this.clickDiscount;
    if (this.collection.discount == true) {
      if (this.discount > 0) {
        this.collection.discountValue = this.reminderTotal - this.selectedPay;
      } else if (this.latestPrice > 0) {
        this.collection.discountValue = this.latestPrice;
      } else {
        this.collection.discountValue = this.saleValue;
      }
    } else {
      this.collection.discountValue = 0;
    }
    this.collection.paymentType = this.selectedPayType;
    this.collection.paymentValue = this.addPay;
    this.collection.price = this.reminderTotal;
    this.collection.protocolId = this.protocolId;
    this.collection.updatedBy = "";
    this.collection.updatedDate = new Date();
    this.arrears = this.arrears - this.addPay;
    this.collections.push(this.collection);
    this.formControl = new FormControl("", [Validators.max(this.arrears),Validators.min(1)]);
    this.addPay=this.arrears;
    this.getCollectionsAdd();
  }
  addCollections() {
    const totalSelect = this.selection.selected;
    this.workingForCollection = new Working({});
    this.workingForCollection.payType = this.selectedPayType;
    for (let i = 0; i < this.selectedId.length; i++) {
      //0-100tl
      if (this.selectedPays[i] > 0) {
        this.workingService.getById(this.selectedId[i]).subscribe((working) => {
          if(this.clickDiscount){
            if(this.discount>0){
              this.workingForCollection.saleValue=this.discountValueArray[i];
              this.workingForCollection.arrearsValue =
          working.price - (this.selectedPays[i]+this.discountValueArray[i]);
            }else if(this.saleValue>0){
              this.workingForCollection.saleValue=this.discountValue;
              this.workingForCollection.arrearsValue =
          working.price - (this.selectedPays[i]+this.discountValue);
            }else{
              this.workingForCollection.saleValue=this.discountValue;
              this.workingForCollection.arrearsValue =
          working.price - (this.selectedPays[i]+this.discountValue);
            }
          }else{
          this.workingForCollection.arrearsValue =
          working.price - (working.paidValue+this.selectedPays[i]);
          }
          this.workingForCollection.price = working.price;
          this.workingForCollection.billNo = working.billNo;
          this.workingForCollection.doctorId = working.doctorId;
          this.workingForCollection.doctorRatio = working.doctorRatio;
          this.workingForCollection.metarialId = working.metarialId;
          this.workingForCollection.nonTaxablePrice = working.nonTaxablePrice;
          this.workingForCollection.processId = working.processId;
          this.workingForCollection.quantity = working.quantity;
          this.workingForCollection.receiptNo = working.receiptNo;
          this.workingForCollection.taxRatio = working.taxRatio;
          // this.workingForCollection.user = this.userName;
          this.workingForCollection.user = 'System Admin';
          this.workingForCollection.protocolId = working.protocolId;
          this.workingForCollection.workingDateTime = new Date(
            working.workingDateTime
          );
          this.workingForCollection.id = this.selectedId[i];
          this.workingForCollection.paidValue = working.paidValue+this.selectedPays[i];
          if(this.workingForCollection.id==0){
            this.workingService.add(this.workingForCollection).subscribe(data=>{
              this.dialogRef.close(1);
              this.selectedPayType = undefined;
              }
              );
          }else{
            this.workingService.update(this.workingForCollection).subscribe(data=>{
              this.dialogRef.close(1);
              this.selectedPayType = undefined;
              }
              );
          }
        });
      }
    }
    this.selection = new SelectionModel<WorkingDto>(true, []);
    this.dataSourceForCollection.data.forEach((item) => {
      this.collectionService.add(item).subscribe(
        (data) => {}
      );
    });
  }
  deletePayment(i: number, row) {
    const value: number = row.paymentValue;
    const index = i;
    this.id = row.id;
    this.arrears = this.arrears + value;
    this.collections.splice(i, 1);
    this.formControl = new FormControl("", [Validators.max(this.arrears),Validators.min(1)]);
    this.getCollectionsAdd();
  }
  getCollectionsAdd() {
    this.dataSourceForCollection = new MatTableDataSource<Collection>(
      this.collections
    );
    setTimeout(() => (this.dataSource.paginator = this.paginatorAdd));
  }
  deleteAllPayments() {
    this.collections.forEach((m) => {
      this.arrears = this.arrears + m.paymentValue;
    });
    this.collections = [];
    this.formControl = new FormControl("", [Validators.max(this.arrears),Validators.min(1)]);
    this.getCollectionsAdd();
  }
  toggleFirstPanel(){
    this.firstPanel.toggle();
  }
  passParameter() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: this.translate.instant('ApplyDiscount'),
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
        confirmButtonText: this.translate.instant('Yes'),
        cancelButtonText: this.translate.instant('No'),
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.toggleFirstPanel();
          this.addDiscount();
          swalWithBootstrapButtons.fire({
            title: this.translate.instant('DiscountApplied'),
            icon:"success",
            confirmButtonText: this.translate.instant('OK')
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: this.translate.instant('DiscountCancelled'),
            icon:"warning",
            confirmButtonText: this.translate.instant('OK')
          });
        }
      });
  }
  checkClaim(claim:string):boolean{
		return this.authService.claimGuard(claim)
	}
}
