import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'add',
	moduleId: module.id,
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {
	@ViewChild("MapView") mapView: ElementRef;

	constructor() { }



	//Map events
	onMapReady = (event) => {
		console.log("Map Ready");
	};
	ngOnInit() { }
}