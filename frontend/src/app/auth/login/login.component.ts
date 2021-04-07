import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StaffService} from '../staff.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // public formLogin: FormGroup;
  public form = {
    email: null,
    password: null
  };
  public error = null;

  constructor(private router: Router, private staffService: StaffService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.staffService.login(this.form.email, this.form.password).subscribe(
      (data) => {
        this.handleResponse(data);
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  handleResponse(data){
    // this.tokeService.handle(data.access_token);
    // this.auth.changeAuthStatus(true); // set value for navbar
    this.router.navigateByUrl('/profile');
    // this.router.navigate(['/']);
  }

  handleError(error){
    // this.spinnerService.hide();
    // this._submitted = false;

    // Validation error
    this.error = error.message;
  }

}
