import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { IUser } from '../Interfaces/iuser';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  apiImage = 'https://ui-avatars.com/api/?name=';

  userForm: FormGroup;
  editActualUser: IUser| null = null;
  editIdByUser: number| null = null;

  users: IUser[] = [
    { name: 'Juan David', email: 'juan.parroquiano95@gmail.com', photoProfile: `${this.apiImage}Juan+David`},
    { name: 'Jose Nicolas', email: 'nicolasparro@gmail.com', photoProfile: `${this.apiImage}Jose+Nicolas`},
    { name: 'Leidy Jhoana', email: 'leidyparro@gmail.com', photoProfile: `${this.apiImage}Leidy+Jhoana`},
  ];

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      photoProfile: ['', Validators.required]
    });
  }

  async addUser() {
    if (!this.editActualUser) {
      this.users.push(this.userForm.value);
    } else {
      this.users[this.editIdByUser!] = this.userForm.value
      this.editActualUser = null
      this.editIdByUser = null
    }
    this.userForm.reset();
  }

  async editUser(id: number) {
    this.editActualUser = { ...this.users[id]}
    this.editIdByUser = id
    this.userForm.patchValue(this.editActualUser)
  }

  async deleteUser(id: number) {
    this.users.splice(id, 1);
  }

  ngOnInit(): void {
  }

}
