import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/users/user.service';
import { User } from '../shared/users/user-model';
import { FilterPipe } from '../shared/filter.pipe';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[];
  selUser: any;
  constructor(private userService: UserService) { }
  ngOnInit() {
    this.getUsers();
  }
  sortElem(e) {
    const field = e.target.innerText.toLowerCase();
    if ((field === 'name' || field === 'email') && this.users) {
      console.log(field);
      this.users.sort((a: User, b: User) => {
        if (a[field].toLowerCase() < b[field].toLowerCase()) return -1;
        else if (a[field].toLowerCase() > b[field].toLowerCase()) return 1;
        else return 0;
      });
    }
  }
  getUsers(): void {
    this.userService.getUsers()
      .then(users => this.users = users);
  }


}
