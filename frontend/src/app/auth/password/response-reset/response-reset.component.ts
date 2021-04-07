import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SnotifyService} from 'ng-snotify';
import {StaffService} from '../../staff.service';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.scss']
})
export class ResponseResetComponent implements OnInit {

  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    resetToken: null
  };

  public errorsFields: any;
  public errorsMessage: any;

  constructor(
    private route: ActivatedRoute,
    private staffService: StaffService,
    private notify: SnotifyService,
    private router: Router
  ) {

    route.queryParams.subscribe(params => {
      this.form.resetToken = params.token;
    });

  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.staffService.changePassword(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(res){
    this.notify.confirm('Done!, now login with new Password', {
      buttons: [
        {
          text: 'Okay',
          action : toster => {
            this.router.navigate(['/login']),
              this.notify.remove(toster.id);
          }
        },
      ]
    });
  }

  handleError(error){
    this.errorsMessage = error.message;
    this.errorsFields = error.errors;
  }

}
