import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';
import { CommonModule } from "@angular/common";
import { NativeScriptFormsModule } from 'nativescript-angular/forms'
import { ReactiveFormsModule } from "@angular/forms";
import { ListComponent } from './list/list.component';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { AddComponent } from './add/add.component';
import { LandsService } from './shared/land.service';
import { AuthGuard } from '../../shared/auth-guard.service';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { LocationService } from './shared/location.service';
import { DetailsComponent } from './details/details.component';
import { registerElement } from "nativescript-angular";
import { DetailsEditComponent } from "./details-edit/details-edit.component";
registerElement("Gradient", () => require("nativescript-gradient").Gradient);

export const routes = [
    {
        path: 'lands',
        canActivate: [AuthGuard],
        children: [
            { path: 'add', component: AddComponent },
            { path: 'list', component: ListComponent },
            { path: 'details', component: DetailsComponent },
            { path: 'details-edit', component: DetailsEditComponent }
        ]
    }
];

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        NativeScriptRouterModule.forChild(routes),
        CommonModule
    ],
    declarations: [ListComponent, AddComponent, DetailsComponent, DetailsEditComponent],
    providers: [LandsService, LocationService],
    exports: [NativeScriptRouterModule],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class LandsModule { }