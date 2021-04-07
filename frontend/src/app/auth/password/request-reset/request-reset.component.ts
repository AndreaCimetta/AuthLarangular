import { Component, OnInit } from '@angular/core';
import {StaffService} from '../../staff.service';
import { SnotifyModule, SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.scss']
})
export class RequestResetComponent implements OnInit {

  public form = {
    email: null
  };

  public error = null;

  constructor(
    private staffService: StaffService,
    private notify: SnotifyService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.notify.info('Wait', {timeout: 5000});
    this.staffService.sendPasswordResetLink(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.notify.error(error.message)
    );
  }

  handleResponse(data){
    this.notify.success(data, {timeout: 0});
    this.form.email = null;
  }
}
