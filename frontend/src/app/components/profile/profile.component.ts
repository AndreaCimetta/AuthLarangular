import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StaffService} from '../../auth/staff.service';
import {ProfileDataService} from './profile-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public error = null;

  constructor(private router: Router, private profileDataService: ProfileDataService) { }

  ngOnInit(): void {
    this.onSubmit();
  }

  onSubmit(){
    this.profileDataService.getProfile().subscribe(
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
    // this.router.navigateByUrl('/profile');
    // this.router.navigate(['/']);
    console.log(data, '');
  }

  handleError(error){
    // this.spinnerService.hide();
    // this._submitted = false;

    // Validation error
    this.error = error.message;
  }
}
