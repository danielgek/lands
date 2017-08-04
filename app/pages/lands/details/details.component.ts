import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { PageRoute, RouterExtensions } from 'nativescript-angular/router';
import "rxjs/add/operator/switchMap";
import { LandsService } from '../shared/land.service';

@Component({
	selector: 'details',
	moduleId: module.id,
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
	
	form: FormGroup;
	
	constructor(
		private fb: FormBuilder,
		private pageRoute: PageRoute,
		private landsService: LandsService,
		private routerExtensions: RouterExtensions
	) { }

	ngOnInit() {
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
			this.routerExtensions.navigate(['lands/list'],{ clearHistory: true })
		}
	}

	generateStaticMap(points: { latitude: number, longitude: number }[]) {
		console.log(this.form.controls['points'].value)
		return this.landsService.generateStaticMapImage(points);
	}
}