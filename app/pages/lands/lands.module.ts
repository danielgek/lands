import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { CommonModule } from "@angular/common";
import { ListComponent } from './list/list.component';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { AddComponent } from './add/add.component';
import { LandsService } from './shared/land.service';
import { AuthGuard } from '../../shared/auth-guard.service';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { LocationService } from './shared/location.service';


export const routes = [
    {
        path: 'lands',
        canActivate: [AuthGuard],
        children: [
            { path: 'add', component: AddComponent },
            { path: 'list', component: ListComponent },
        ]
    }
];

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptRouterModule.forChild(routes),
        CommonModule
    ],
    declarations: [ListComponent, AddComponent],
    providers: [LandsService, LocationService],
    exports: [NativeScriptRouterModule]
})
export class LandsModule { }