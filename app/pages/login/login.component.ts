import { Component, OnInit } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import { AuthService } from '../../shared/auth.service';
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from 'tns-core-modules/ui/page';
import { setStatusBarWite } from '../../utils/status-bar';
import { getDefaultTrasition } from '../../utils/transition';

@Component({
	selector: 'login',
	moduleId: module.id,
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

	isSignUp = false;

	constructor(
		private fs: AuthService,
		private routerExtensions: RouterExtensions,
		private page: Page
	) { }

	ngOnInit() { 
		this.page.actionBarHidden = true;
		this.page.backgroundSpanUnderStatusBar = true;
		setStatusBarWite(false);
	}


	login(email: string, password: string) {
		this.fs.login(email, password).subscribe(() => {
			this.routerExtensions.navigate(['/lands/list'], {
				transition: getDefaultTrasition()
			});
		},(error) => {
			console.error(error);
		});
		
	}

	signUp(email: string, password: string) {
		this.fs.signUp(email, password).subscribe(()=> {
			this.routerExtensions.navigate(['/lands/list']);
		},(error) => {
			console.error(error);
		}); 
	}

	toogleSignUp() {
		this.isSignUp = !this.isSignUp;
	}
}