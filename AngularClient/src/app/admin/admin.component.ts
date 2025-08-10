import { Component } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { first,map } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
loading:boolean = false;
user:any;
constructor(private userService:UserService){}
ngOnInit() {
  this.loading = true;
  this.userService.getAll().pipe(first()).subscribe({
    next: (response:any) => {
      this.user = {userName:response.data.userName,role:response.data.role};
      this.loading = false;
    },
    error: () => this.loading = false
  });
}
}
