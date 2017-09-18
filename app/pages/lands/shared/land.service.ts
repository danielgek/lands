import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import { AuthStateData, User } from 'nativescript-plugin-firebase/firebase';
import { Land } from "./land.model";
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AddEventListenerResult } from 'nativescript-plugin-firebase';

import * as polyline from '@mapbox/polyline'
import { AuthService } from '../../../shared/auth.service';



@Injectable()
export class LandsService {

	lands: BehaviorSubject<Land[]>
	firebaseEndpoint: string;

	constructor(private ngZone: NgZone, private authSetvice: AuthService) {
		this.lands = new BehaviorSubject<Land[]>([]);
		this.firebaseEndpoint = `/users/${this.authSetvice.user.uid}/lands/`;
	}

	addLand(land: Land): Observable<any> {
		return fromPromise(firebase.push(this.firebaseEndpoint, land));
	}

	deleteLand(land: Land) {
		firebase.remove(this.firebaseEndpoint + land.id);
	}

	editLand() {

	}

	getLand(id: string): Observable<Land> {
		return new Observable((observer: any) => {
			let listenerWrapper: AddEventListenerResult;
			let onValueEvent = (snapshot: any) => {
				this.ngZone.run(() => {
					
					observer.next(Object.assign({ id: snapshot.Key}, snapshot.value));
				});
			};
			firebase.addValueEventListener(onValueEvent, `${this.firebaseEndpoint}/${id}`).then(
				(lWrapper) => {
					listenerWrapper = lWrapper;
				}
			);
			return () => {
				firebase.removeEventListeners(listenerWrapper.listeners, listenerWrapper.path);
			}
		});
	}

	getAllLands(): Observable<Land[]> {
	
		return new Observable((observer: any) => {
			let listenerWrapper: AddEventListenerResult;
			let onValueEvent = (snapshot: any) => {
				this.ngZone.run(() => {
					let results = this.handleSnapshot(snapshot.value);
					observer.next(results);
				});
			};
			firebase.addValueEventListener(onValueEvent, this.firebaseEndpoint).then(
				(lWrapper) => {
					listenerWrapper = lWrapper;
				}
			);
			return () => { 
				firebase.removeEventListeners(listenerWrapper.listeners, listenerWrapper.path);
			}
		});
	}

	handleSnapshot(data: any) {
		let allItems = [];
		if (data) {
			for (let id in data) {
				let result = Object.assign({ id: id }, data[id]);
				allItems.push(result);
			}
		}
		return allItems;
	}

	generateStaticMapImage(points: {latitude: number, longitude: number}[]) {
		let mapsStaticEndpoint = 'https://maps.googleapis.com/maps/api/staticmap?';
		let pline = polyline.encode(points.map((point) => [point.latitude, point.longitude]));
		return encodeURI(`${mapsStaticEndpoint}path=color:0x00000000|weight:5|fillcolor:0x00968833|enc:${pline}&size=1000x1000&key=AIzaSyC4ta4P3ELyuDZvqlj84vmIG6VaXdjjzhs`);
	}
}