import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { PageRoute, RouterExtensions } from 'nativescript-angular/router';
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/do";
import { LandsService } from '../shared/land.service';
import { Page } from 'ui/page';
import { setStatusBarWite } from "../../../utils/status-bar";
import { Observable } from 'rxjs/Observable';
import { Land } from '../shared/land.model';
import { Subject } from 'rxjs/Subject';


@Component({
	selector: 'details',
	moduleId: module.id,
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {

	land$: Observable<Land>;
	img$: Subject<string> = new Subject<string>();
	
	constructor(
		private pageRoute: PageRoute,
		private landsService: LandsService,
		private routerExtensions: RouterExtensions,
		private page: Page
	) { }

	ngOnInit() {
		this.page.backgroundSpanUnderStatusBar = true;
		setStatusBarWite(true);
		
		this.pageRoute.activatedRoute
			.switchMap(activatedRoute => activatedRoute.params)
			.subscribe((params) => { 
				const id = params["id"];
				
				this.land$ = this.landsService.getLand(id)
					.do((land) => {
						this.img$.next(this.generateStaticMap(land.points));
					});
				
			});
	}
	
	generateStaticMap(points: { latitude: number, longitude: number }[]) {
		return this.landsService.generateStaticMapImage(points);
	}

	back() {
		this.routerExtensions.backToPreviousPage();
	}
}