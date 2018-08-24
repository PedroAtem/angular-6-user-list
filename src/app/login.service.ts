import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './model/user';
import { USERS } from './mock-users';
import { Md5 } from 'ts-md5/dist/md5';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
	providedIn: 'root'
})

export class LoginService {

	constructor(private cookieService: CookieService) { }

	login(username, password, autoLogin): Observable<User> {
		let _user: User = null;
		let _filterUser = USERS.filter(function(u) {
			if (u.username == username && u.password == Md5.hashStr(password)) return u;
		});
		if (_filterUser.length > 0) {
			_user = _filterUser[0];
			if (autoLogin) {
				this.cookieService.set('autoLogin', JSON.stringify({
					username: username,
					password: Md5.hashStr(password),
				}));
			}
		}
		return of(_user);
	}

	checkAutoLogin(): Observable<User> {
		console.log('kjsdvfhvbsdf');
		let autoLogin = this.cookieService.get('autoLogin');
		if (autoLogin) {
			autoLogin = JSON.parse(autoLogin);
			let _user: User = null;
			let _filterUser = USERS.filter(function(u) {
				if (u.username == autoLogin['username'] && u.password == autoLogin['password']) return u;
			});
			if (_filterUser.length > 0) _user = _filterUser[0];
			return of(_user);
		}
		else return of(null)
	}
}