import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { LocationService } from "../shared/location.service";
import * as mapsModule from 'nativescript-google-maps-sdk';
import { Land } from "../shared/land.model";
import { Color } from 'color';
import { Page } from 'ui/page';
import { isAndroid } from 'platform';
import { registerElement } from "nativescript-angular";
registerElement("Gradient", () => require("nativescript-gradient").Gradient);

@Component({
	selector: 'add',
	moduleId: module.id,
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

	@ViewChild("MapView") mapViewRef: ElementRef;

	mapView: mapsModule.MapView;

	land: Land;

	markers: mapsModule.Marker[] = [];

	polygon: mapsModule.Polygon;

	constructor(
		private locationService: LocationService,
		private routerExtensions: RouterExtensions,
		private page: Page
	) { }

	ngOnInit() {
		this.page.backgroundSpanUnderStatusBar = true;
		//this.page.statusBarStyle.

		

		// let backgroundDrawable = new android.graphics.drawable.GradientDrawable();
		// const LINEAR_GRADIENT = 0;
		// backgroundDrawable.setGradientType(LINEAR_GRADIENT);
		// // backgroundDrawable.setOrientation(android.graphics.drawable.GradientDrawable.Orientation.TOP_BOTTOM)
		// backgroundDrawable.setColors([new Color(0, 0, 0, 0).android, new Color(45, 0, 0, 0).android]);
		// (<any>this.page.actionBar.).setBackgroundDrawable(backgroundDrawable);
	}


	
	onMapReady = (event) => {
		this.mapView = event.object;
		this.polygon = new mapsModule.Polygon();
		this.mapView.settings.myLocationButtonEnabled = false;
		this.mapView.settings.zoomControlsEnabled = false;
		this.mapView.settings.zoomGesturesEnabled = true;
		if (isAndroid) {
			this.mapView.gMap.setMyLocationEnabled(true);
		}else {
			this.mapView.gMap.setMyLocationEnabled = true;
		}
		this.polygon.fillColor = new Color( 0.7, 0, 255, 0);
		this.locationService.getCurrentLocation()
			.subscribe((location) => {
				this.mapView.latitude = location.latitude;
				this.mapView.longitude = location.longitude;
				this.mapView.zoom = 14;
			});
	};

	addMarkerInCurrentLocation() {
		this.locationService.getCurrentLocation()
			.subscribe((location) => {
				let marker = new mapsModule.Marker();
				marker.position = mapsModule.Position.positionFromLatLng(location.latitude, location.longitude);
				// marker.title = "Point One";
				// marker.
				// marker.userData = { index: 1 };
				marker.draggable = true;
				this.mapView.addMarker(marker);
				this.markers.push(marker);
				this.updatePoligon();
			});
	}

	updatePoligon() {
		console.log(this.mapView.findShape((shape) => shape === this.polygon));
		if(this.markers.length > 2) {
			let tempPolygon = this.mapView.findShape((shape) => shape === this.polygon);
			if(tempPolygon) {
				console.log('removi o polygon');
				this.mapView.removeShape(this.polygon);
			}
			console.log('remove all points');
			//this.polygon.removeAllPoints();
			console.log('add points')

			this.polygon = new mapsModule.Polygon();
			this.polygon.addPoints(this.markers.map((marker) => marker.position))	
			console.log('adding polygon');
			this.mapView.addPolygon(this.polygon);
			
		} else {
			this.mapView.removeAllShapes();
			this.polygon.removeAllPoints();
		}
	}

	goToDetails() {
		this.routerExtensions.navigate(['/lands/details', {
			points: JSON.stringify(this.markers.map((marker) => {
				return {
					latitude: marker.position.latitude,
					longitude: marker.position.longitude
				};
			}))
		}]);
	}

}