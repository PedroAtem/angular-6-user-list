import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../user.service';
import { AlertService } from '../alert.service';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

	user: Object;
	action: string = 'add';

	// errors
	nameFormControl = new FormControl('', [ Validators.required ]);
	emailFormControl = new FormControl('', Validators.compose([Validators.required, Validators.email]));
	usernameFormControl = new FormControl('', [ Validators.required ]);
	passwordFormControl = new FormControl('', [ Validators.required ]);
	matcher = new MyErrorStateMatcher();

	constructor(
		private userService: UserService,
		private alertService: AlertService,
		private router: Router,
		private route: ActivatedRoute
	) {
		this.user = {
			id: 0,
			name: '',
			email: '',
			userlevel: '1',
			username: '',
			password: '',
			confirmPassword: '',
			backupPassword: ''
		};
		if (this.route.snapshot.paramMap.get('action') == 'edit' && this.route.snapshot.paramMap.get('id')) {
			this.action = 'edit';
			this.userService.getUser(Number(this.route.snapshot.paramMap.get('id'))).subscribe(_user => {
				this.user['id'] = _user.id;
				this.user['name'] =_user.name;
				this.user['email'] =_user.email;
				this.user['userlevel'] =_user.userlevel;
				this.user['username'] =_user.username;
				this.user['password'] =_user.password;
				this.user['confirmPassword'] =_user.password;
				this.user['backupPassword'] =_user.password;
			});
		}
	}

	ngOnInit() {
		this.userService.checkedLogged().subscribe(logged => {
			if (!logged) {
				this.router.navigate(['/login']);
			}
		});
	}

	insertUpdateUser() {
		// validate user
		if (this.user['password'] != this.user['confirmPassword']) {
			this.alertService.showAlert('Passworss do not match', 'OK');
		}
		else {
			if (this.action == 'add') {
				this.userService.addUser(new User(
					0,
					this.user['name'],
					this.user['email'],
					this.user['username'],
					this.user['password'],
					this.user['userlevel']
				)).subscribe(ret => {
					this.alertService.showAlert(ret['msg'], 'OK');
					if (!ret['error']) this.router.navigate(['/home']);
				});
			}
			else if (this.action == 'edit') {
				this.userService.updateUser(new User(
					this.user['id'],
					this.user['name'],
					this.user['email'],
					this.user['username'],
					this.user['password'],
					this.user['userlevel']
				), this.user['password'] != this.user['backupPassword']).subscribe(ret => {
					this.alertService.showAlert(ret['msg'], 'OK');
					if (!ret['error']) this.router.navigate(['/home']);
				});
			}
		}
	}

}
