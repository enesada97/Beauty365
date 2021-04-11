import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/system-service/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: []
})
export class MainLayoutComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

}
