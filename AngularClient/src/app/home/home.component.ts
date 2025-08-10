import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

loading: boolean = false;
user?: User | null;
userFromApi?:User;

  constructor(private userService:UserService, private authService:AuthenticationService){
    this.user = this.authService.userValue;
}

ngOnInit() {
  this.loading = true;
  if (this.user && this.user.id !== undefined) {
    this.userService.getById(this.user.id).subscribe({
      next: (users) => {
        this.userFromApi = users
        this.loading = false;
      },
      error: () => this.loading = false
    });
  } else {
    this.loading = false;
  }
}


}
