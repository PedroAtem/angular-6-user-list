export class User {
	id: number;
	name: string;
	email: string;
	username: string;
	password: string;
	userlevel: string;

	constructor(id: number, name: string, email: string, username: string, password: string, userlevel: string) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.username = username;
		this.password = password;
		this.userlevel = userlevel;
	}
}