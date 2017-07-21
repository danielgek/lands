import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./pages/login/login.component";
import { AuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth-guard.service';
import { LandsModule } from "./pages/lands/lands.module";

import { registerElement } from 'nativescript-angular/element-registry';
registerElement("CardView", () => require("nativescript-cardview").CardView);
registerElement("Fab", () => require("nativescript-floatingactionbutton").Fab);
registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);

import * as platform from "platform";
declare var GMSServices: any;

if (platform.isIOS) {
    GMSServices.provideAPIKey("AIzaSyCNgjEnmM9lLDYTBwXA-QHiO8rX0wP58FY");
}


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        CommonModule,
        NativeScriptModule,
        AppRoutingModule,
        LandsModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
    ],
    providers: [
        AuthService,
        AuthGuard
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
