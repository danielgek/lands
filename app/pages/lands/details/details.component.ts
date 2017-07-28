import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PageRoute } from "nativescript-angular/router";
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
			.forEach((params) => { this.form.get('points').setValue(params["points"]); });
	}
	
	saveLand() {
		if(this.form.valid) {
			console.dir(this.form.value);
			this.landsService.addLand(this.form.value);
		}
	}
}