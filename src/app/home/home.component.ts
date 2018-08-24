import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	users: Array<User>;
	search: string = '';

	constructor(
		private userService: UserService,
		private alertService: AlertService,
		private router: Router
	) { }

	ngOnInit() {
		this.userService.checkedLogged().subscribe(logged => {
			if (logged) {
				this.userService.getUsers().subscribe(users => this.users = users);
			}
			else {
				this.router.navigate(['/login']);
			}
		});
	}

	checkUserLevel(userLevel) {
		if (UserService.userInfo) {
			return !((Number(UserService.userInfo['userlevel']) & Number(userLevel)) == Number(UserService.userInfo['userlevel']));
		}
		else return true;
	}

	editUser(user: User) {
		this.router.navigate(['/add-user', { id: user.id, action: 'edit' }]);
	}

	removeUser(user: User) {
		this.userService.removeUser(user).subscribe(ret => {
			this.alertService.showAlert('User successfully removed', 'OK');
		})
	}

	searchUser(user) {
		if (this.search == '') return false;
		else if (user.name.toLowerCase().indexOf(this.search.toLowerCase()) != -1) return false;
		else if (user.username.toLowerCase().indexOf(this.search.toLowerCase()) != -1) return false;
		else if (user.email.toLowerCase().indexOf(this.search.toLowerCase()) != -1) return false;
		else return true;
	}

}