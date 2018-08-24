import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './model/user';
import { USERS } from './mock-users';
import { Md5 } from 'ts-md5/dist/md5';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	public static userInfo: User = null;

	constructor(private cookieService: CookieService) { }

	checkFirstTime(): Observable<boolean> {
		if (!this.cookieService.check('users')) {
			this.cookieService.set('users', JSON.stringify([
				{
					id: 1,
					name: 'Admin',
					email: 'admin@email.com',
					username: 'admin',
					password: '0192023a7bbd73250516f069df18b500',
					userlevel: 1
				},
				{
					id: 2,
					name: 'Usuário',
					email: 'user@email.com',
					username: 'user',
					password: '6ad14ba9986e3615423dfca256d04e3f',
					userlevel: 2
				}
			]))
		}
		let users = JSON.parse(this.cookieService.get('users'));
		users.forEach(function(user) {
			USERS.push(new User(
				user['id'],
				user['name'],
				user['email'],
				user['username'],
				user['password'],
				user['userlevel']
			));
		});
		return of(true);
	}

	getUsers(): Observable<User[]> {
		return of(USERS);
	}

	setLoggedUser(user: User) {
		UserService.userInfo = user;
	}

	logout() {
		UserService.userInfo = null;
	}
}
