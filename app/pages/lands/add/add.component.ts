import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { LocationService } from "../shared/location.service";
import * as mapsModule from 'nativescript-google-maps-sdk';
import { Land } from "../shared/land.model";

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
		private routerExtensions: RouterExtensions
	) { }

	ngOnInit() {
		
	}
	
	onMapReady = (event) => {
		this.mapView = event.object;
		this.polygon = new mapsModule.Polygon();
		this.mapView.settings.indoorLevelPickerEnabled = true;
		this.mapView.settings.compassEnabled = true;
		this.mapView.settings.myLocationButtonEnabled = true;
		this.mapView.settings.zoomControlsEnabled = true;
		this.mapView.settings.zoomGesturesEnabled = true;
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
				marker.title = "Point One";
				marker.userData = { index: 1 };
				marker.draggable = true;
				this.mapView.addMarker(marker);
				this.markers.push(marker);
				this.updatePoligon();
			});
	}

	updatePoligon() {
		if(this.markers.length > 2) {
			if(!this.mapView.findShape((shape) => shape === this.polygon)) {
				this.mapView.addPolygon(this.polygon);
			}
			this.polygon.removeAllPoints();
			this.polygon.addPoints(this.markers.map((marker) => marker.position))	
		} else {
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