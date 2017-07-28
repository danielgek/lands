import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import { AuthStateData, User } from 'nativescript-plugin-firebase/firebase';
import { Land } from "./land.model";
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AddEventListenerResult } from 'nativescript-plugin-firebase';



@Injectable()
export class LandsService {

	lands: BehaviorSubject<Land[]>

	constructor(private ngZone: NgZone) {
		this.lands = new BehaviorSubject<Land[]>([]);
	}

	addLand(land: Land): Observable<any> {
		return fromPromise(firebase.push('/lands', land));
	}

	removeLand() {

	}

	editLand() {

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
			firebase.addValueEventListener(onValueEvent, `/lands`).then(
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
}