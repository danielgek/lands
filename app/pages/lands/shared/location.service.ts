import { Injectable } from '@angular/core';
import * as geolocation from 'nativescript-geolocation';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Observer } from 'rxjs/Observer';
import { Accuracy } from 'ui/enums';

@Injectable()
export class LocationService {

    constructor() { }

    isEnabled() {
        return geolocation.isEnabled();
    }

    enableLocationRequest() {
        if (!geolocation.isEnabled()) {
            geolocation.enableLocationRequest();
        }
    }

    getCurrentLocation(): Observable<geolocation.Location> {
        return fromPromise(geolocation.getCurrentLocation({ desiredAccuracy: 3 }))
    }
    watchLocation(): Observable<geolocation.Location> {
        return Observable.create((observer: Observer<geolocation.Location>) => {
            geolocation.watchLocation(
                (loc) => {
                    if (loc) {
                        observer.next(loc);
                    }
                },
                (error) =>  {
                    observer.error(error);
                    console.log("Error: " + error.message);
                },
                { desiredAccuracy: Accuracy.high, updateDistance: 0.1, minimumUpdateTime: 100 });
        });
    }


    distance(location1: geolocation.Location, location2: geolocation.Location): number {
        return geolocation.distance(location1, location2);
    }
    
}
