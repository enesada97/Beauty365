import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Subject } from "rxjs";
import { LogDto } from "src/app/core/models/logdto";
import { AuthService } from "src/app/core/service/system-service/auth.service";
import { LogDtoService } from "src/app/core/service/system-service/logdto.service";

@Component({
  selector: "app-log",
  templateUrl: "./log.component.html",
  styleUrls: ["./log.component.sass"],
})
export class LogComponent implements AfterViewInit, OnInit {
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    "id",
    "level",
    "exceptionMessage",
    "timeStamp",
    "user",
    "value",
    "type",
  ];
  logDtoList: LogDto[];
  logDto: LogDto = new LogDto();
  logDtoAddForm: FormGroup;
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    public logDtoService: LogDtoService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getLogDtoList();
  }
  refresh(){
    this.getLogDtoList();
  }
  getLogDtoList() {
    this.logDtoService.getList().subscribe((data) => {
      this.logDtoList = data;
      this.dataSource = new MatTableDataSource<LogDto>(this.logDtoList);
      setTimeout(() => (this.dataSource.sort = this.sort));
      setTimeout(() => (this.dataSource.paginator = this.paginator));
    });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.getLogDtoList();
  }

  checkClaim(claim: string): boolean {
    return this.authService.claimGuard(claim);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
