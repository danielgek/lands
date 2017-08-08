import { Component, OnInit } from '@angular/core';

import { Land } from '../shared/land.model';
import { LandsService } from '../shared/land.service';
import { RouterExtensions } from 'nativescript-angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../shared/auth.service';
import { setStatusBarWite } from "../../../utils/status-bar";
import { Page } from 'ui/page';

@Component({
	selector: 'list',
	moduleId: module.id,
	templateUrl: 'list.component.html',
	styleUrls: ['list.component.css']
})

export class ListComponent implements OnInit {
	list: Observable<Land[]>;

	constructor(
		private landsService: LandsService,
		private routerExtensions: RouterExtensions,
		private authService: AuthService,
		private page: Page
	) { }

	ngOnInit() {
		this.page.on("navigatingTo", () => {
			setStatusBarWite(false);
		});
		this.list = this.landsService.getAllLands();
	}

	addNew() {
		this.routerExtensions.navigate(['/lands/add']);
	}

	generateStaticMap(points: { latitude: number, longitude: number}[]) {
		return this.landsService.generateStaticMapImage(points).replace(' ', '%20');
	}

	logout() {
		this.authService.logout();
		this.routerExtensions.navigate(['/login'], { clearHistory: true })
	}

	delete(land: Land) {
		this.landsService.deleteLand(land);
	}

	goToDetails(id: string) {
		this.routerExtensions.navigate(['lands/details', { id } ])
	}
}