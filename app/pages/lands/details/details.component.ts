import { Component, OnInit } from '@angular/core';
import { PageRoute } from "nativescript-angular/router";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
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
		private landsService: LandsService
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
			console.dir(this.form.value);
			this.landsService.addLand(this.form.value);
		}
	}
}