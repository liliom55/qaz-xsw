import { Component, OnInit } from '@angular/core';
import { FormValidationService } from './form-validation.service';
import { User } from '../shared/users/user-model';
import { UserService } from '../shared/users/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {
  submitted = false;
  user: User;
  title: string;
  userId: number;
  constructor(
    private formValid: FormValidationService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.submitted = false;
    this.user = new User();
    
    const id = this.route.params.subscribe(params => {
      const id = +params['id'];
      this.userId = id;
      this.title = id ? 'Edit User' : 'Add User';
      if (!id) { return; }
      this.userService.getUser(id)
        .then(user => this.user = user)
        .catch(error => this.router.navigate(['NotFound']));
    });
    this.formValid.buildForm();
  }

  onSubmit() {
    if (!this.formValid.userForm.valid) { return; }
    this.submitted = true;
    this.user = this.formValid.userForm.value;
    if (this.title === 'Add User') {
      this.addUser();
    } else if (this.title === 'Edit User') {
      this.user.id = this.userId;
      this.editUser();
    }
  }

  addUser() {
    this.userService.createUser(this.user).then(response => this.formValid.buildForm());
  }

  editUser() {
    this.userService.updateUser(this.user).then(response => this.formValid.buildForm());
  }
}
