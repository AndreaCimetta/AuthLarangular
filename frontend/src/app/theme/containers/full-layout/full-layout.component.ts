import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StaffService} from '../../../auth/staff.service';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss']
})
export class FullLayoutComponent implements OnInit {
  public display = false;

  constructor(private staffService: StaffService) { }

  ngOnInit(): void {

  }

  logout(): void{
    this.staffService.logout();
  }

}
