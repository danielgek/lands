import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { PageRoute, RouterExtensions } from 'nativescript-angular/router';
import "rxjs/add/operator/switchMap";
import { LandsService } from '../shared/land.service';
import { Page } from 'ui/page';
import { setStatusBarWite } from "../../../utils/status-bar";
import { getDefaultTrasition } from "../../../utils/transition";


@Component({
	selector: 'details-edit',
	moduleId: module.id,
	templateUrl: './details-edit.component.html',
	styleUrls: ['./details-edit.component.css']
})

export class DetailsEditComponent implements OnInit {
	
	form: FormGroup;
	
	constructor(
		private fb: FormBuilder,
		private pageRoute: PageRoute,
		private landsService: LandsService,
		private routerExtensions: RouterExtensions,
		private page: Page
	) { }

	ngOnInit() {
		this.page.backgroundSpanUnderStatusBar = true;
		setStatusBarWite(true);

		this.form = this.fb.group({
			name: ['', [Validators.required]],
			description: ['', [Validators.required]],
			countryIdentifier: ['', [Validators.required]],
			area: ['', [Validators.required]],
			points: this.fb.array([])
		});

		// get area aprox
		// this.form.get('area').setValue();

		this.pageRoute.activatedRoute
			.switchMap(activatedRoute => activatedRoute.params)
			.subscribe((params) => { 
				const points = <{ latitude: number, longitude: number }[]>JSON.parse(params["points"]);
				const pointsFGs = points.map(point => this.fb.group(point));
				const pointsFormArray = this.fb.array(pointsFGs);
				this.form.setControl('points', pointsFormArray);
			});
	}
	
	saveLand() {
		if(this.form.valid) {
			this.landsService.addLand(this.form.value);
			this.routerExtensions.navigate(['lands/list'], { 
				clearHistory: true,
				transition: getDefaultTrasition()
			})
		}
	}

	generateStaticMap(points: { latitude: number, longitude: number }[]) {
		return this.landsService.generateStaticMapImage(points);
	}

	back() {
		this.routerExtensions.backToPreviousPage();
	}
}