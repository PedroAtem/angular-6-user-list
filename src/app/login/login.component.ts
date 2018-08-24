import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { UserService } from '../user.service';
import { User } from '../model/user';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	users: Array<User>;
	username: string = '';
	password: string = '';
	autoLogin: boolean = false;

	constructor(
		private loginService: LoginService,
		private userService: UserService,
		private router: Router
	) { }

	ngOnInit() {
		this.loginService.checkAutoLogin().subscribe(user => {
			if (user) {
				this.userService.setLoggedUser(user);
				this.router.navigate(['/home']);
			}
		});
	}

	login() {
		this.loginService.login(this.username, this.password, this.autoLogin).subscribe(user => {
			if (user) {
				this.userService.setLoggedUser(user);

				let navigationExtras: NavigationExtras = {
					queryParamsHandling: 'preserve',
					preserveFragment: true
				};
				this.router.navigate(['/home'], navigationExtras);
			}
		});
	}

}
