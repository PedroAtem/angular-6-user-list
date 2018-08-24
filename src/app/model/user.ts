export class User {
	id: number;
	name: string;
	email: string;
	username: string;
	password: string;
	userlevel: number;

	constructor(id: number, name: string, email: string, username: string, password: string, userlevel: number) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.username = username;
		this.password = password;
		this.userlevel = userlevel;
	}
}