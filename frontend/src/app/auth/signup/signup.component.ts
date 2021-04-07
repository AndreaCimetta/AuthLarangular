import { Component, OnInit } from '@angular/core';
import {StaffService} from '../staff.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public form = {
    email: null,
    name: null,
    password: null,
    password_confirmation: null
  };
  public errorsFields: any;
  public errorsMessage: any;

  constructor(private staffService: StaffService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.staffService.
    signup(this.form).subscribe(
      (data) => {
        this.handleResponse(data);
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  handleResponse(data){
    this.router.navigateByUrl('/profile');
  }

  handleError(error){
    this.errorsMessage = error.message;
    this.errorsFields = error.errors;
  }

}
