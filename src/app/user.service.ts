import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { USERS } from './mock-users';
import { User } from './model/user';
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
                    userlevel: '1'
                }
            ]));
        }
        const users = JSON.parse(this.cookieService.get('users'));
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

    checkedLogged(): Observable<boolean> {
        return of(UserService.userInfo != null);
    }

    getUsers(): Observable<User[]> {
        return of(USERS);
    }

    getUser(id: number): Observable<User> {
        const hasUser = USERS.filter(function(existUser) {
            if (id === existUser.id) {
                return existUser;
            }
        });
        if (hasUser.length > 0) {
            return of(hasUser[0]);
        } else {
            return of(null);
        }
    }

    setLoggedUser(user: User) {
        UserService.userInfo = user;
    }

    addUser(user: User): Observable<Object> {
        const ret = new Object();
        const hasUser = USERS.filter(function(existUser) {
            if (user.username === existUser.username) {
                return existUser;
            }
        });
        if (hasUser.length > 0) {
            ret['error'] = true;
            ret['msg'] = 'User already exists';
        } else {
            let newId = 0;
            USERS.forEach(function(_user) {
                if (_user.id > newId) {
                    newId = _user.id;
                }
            });
            newId++;

            user.id = newId;
            user.password = Md5.hashStr(user.password).toString();
            USERS.push(user);
            this.cookieService.set('users', JSON.stringify(USERS));
            ret['error'] = false;
            ret['msg'] = 'User successfully registered';
        }
        return of(ret);
    }

    updateUser(user: User, editedPassword: boolean): Observable<Object> {
        const ret = new Object();
        const hasUser = USERS.filter(function(existUser) {
            if (user.id === existUser.id) {
                return existUser;
            }
        });
        if (hasUser.length === 0) {
            ret['error'] = true;
            ret['msg'] = 'User not found';
        } else {
            const hasAnotherUser = USERS.filter(function(existUser) {
                if (user.id !== existUser.id && user.username === existUser.username) {
                    return existUser;
                }
            });
            if (hasAnotherUser.length > 0) {
                ret['error'] = true;
                ret['msg'] = 'A user with this username already exists';
            } else {
                USERS.forEach(function(_user) {
                    if (user.id === _user.id) {
                        _user.name = user.name;
                        _user.email = user.email;
                        _user.userlevel = user.userlevel;
                        if (editedPassword) {
                            _user.password = Md5.hashStr(user.password).toString();
                        }
                    }
                });

                this.cookieService.set('users', JSON.stringify(USERS));
                ret['error'] = false;
                ret['msg'] = 'User successfully updated';
            }
        }
        return of(ret);
    }

    removeUser(user: User): Observable<boolean> {
        const index = USERS.indexOf(user, 0);
        if (index > -1) {
            USERS.splice(index, 1);
        }
        this.cookieService.set('users', JSON.stringify(USERS));
        return of(true);
    }

    logout() {
        UserService.userInfo = null;
    }
}
