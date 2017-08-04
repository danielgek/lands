import { Component } from "@angular/core";
import { setupStatusBar } from './utils/status-bar';

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent { 
    constructor() {
        setupStatusBar();
     }
}
