import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, NavigationExtras } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

    @ViewChild('sidenav') sidenav: MatSidenav;
    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;
    routes: Array<any> = [
        { name: 'Home', route: '/home', userlevel: [1, 2] },
        { name: 'Add User', route: '/add-user', userlevel: [1] }
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
        this.userService.checkFirstTime().subscribe(ret => {});
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    showNav() {
        return UserService.userInfo;
    }

    checkAdmin(userlevel) {
        if (UserService.userInfo) {
            return !(userlevel.indexOf(Number(UserService.userInfo['userlevel'])) !== -1);
        } else {
            return true;
        }
    }

    logout() {
        this.cookieService.delete('autoLogin');
        this.sidenav.close();
        this.userService.logout();
        this.router.navigate(['/login']);
    }
}
