import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	users: Array<User>;

	constructor(
		private userService: UserService,
		private router: Router
	) { }

	ngOnInit() {
		this.userService.getUsers().subscribe(users => this.users = users);
	}

	editUser(user: User) {
		this.router.navigate(['/add-user', { id: user.id, action: 'edit' }]);
	}

}
