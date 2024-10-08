import {Component, inject, OnInit, signal} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit{
  private usersService:UserService=inject(UserService);
  users: any[] = [];
  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe({
      next:(resp)=>{
        this.users=resp;
        console.log(this.users)
      }
    })
  }

  editUser(i: number, user: any) {

  }
}