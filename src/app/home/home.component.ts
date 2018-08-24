import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	users: Array<User>;

	constructor(private userService: UserService) { }

	ngOnInit() {
		this.userService.getUsers().subscribe(users => this.users = users);
	}

}
