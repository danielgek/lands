import { Injectable } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import { AuthStateData, User } from 'nativescript-plugin-firebase/firebase';
import { Land } from "../pages/lands/shared/land.model";
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { CreateUserResult } from 'nativescript-plugin-firebase/firebase';

@Injectable()
export class AuthService {
    
    user: User;
    loggedIn = false;

    constructor() {
        this.initAndListen();
    }

    initAndListen() {
        firebase.init({
            persist: true, // make firebase work offline
            onAuthStateChanged: (data: AuthStateData) => {
                if(data.loggedIn) {
                    this.user = data.user
                }
                this.loggedIn = data.loggedIn;
            }
        }).then((instance) => {
            // console.log('logged in');
        }, (error) => {
            console.log(error)
        })
    }

    
    signUp(email: string, password: string):Observable<CreateUserResult> {
        return fromPromise(firebase.createUser({
            email,
            password
        }));
    }

    login(email: string, password: string): Observable<User> {
        return fromPromise(firebase.login({
            type: firebase.LoginType.PASSWORD,
            passwordOptions: { email, password }
        }));
    }

    logout(): Observable<any> {
        return fromPromise(firebase.logout());
    }
}