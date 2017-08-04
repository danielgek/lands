import { Component, OnInit } from '@angular/core';

import { Land } from '../shared/land.model';
import { LandsService } from '../shared/land.service';
import { RouterExtensions } from 'nativescript-angular/router';
import { Observable } from 'rxjs/Observable';

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
		private routerExtensions: RouterExtensions
	) { }

	ngOnInit() {
		this.list = this.landsService.getAllLands();
	}

	onItemTap(event) {

	}

	addNew() {
		this.routerExtensions.navigate(['/lands/add']);
	}

	generateStaticMap(points: { latitude: number, longitude: number}[]) {
		return this.landsService.generateStaticMapImage(points).replace(' ', '%20');
	}
}