import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild, OnDestroy } from '@angular/core';
import { UserService } from './user.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, NavigationExtras } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	@ViewChild('sidenav') sidenav: MatSidenav;
	mobileQuery: MediaQueryList;
	private _mobileQueryListener: () => void;
	routes: Array<any> = [
		{ name: 'Home', route: '/home', userLevel: 3 },
		{ name: 'Add User', route: '/add-user', userLevel: 1 }
	];

	constructor(
		changeDetectorRef: ChangeDetectorRef,
		media: MediaMatcher,
		private userService: UserService,
		private router: Router,
		private cookieService: CookieService
	) {
		this.mobileQuery = media.matchMedia('(max-width: 600px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);
	}

	ngOnInit() {
		this.userService.checkFirstTime().subscribe(ret => {
			// this.router.navigate(['/login']);
		});
	}

	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this._mobileQueryListener);
	}

	showNav() {
		return UserService.userInfo;
	}

	checkUserLevel(userLevel) {
		if (UserService.userInfo) {
			return !((Number(UserService.userInfo['userlevel']) & Number(userLevel)) == Number(UserService.userInfo['userlevel']));
		}
		else return true;
	}

	logout() {
		this.cookieService.delete('autoLogin');
		this.sidenav.close();
		this.userService.logout();
		this.router.navigate(['/login']);
	}
}
