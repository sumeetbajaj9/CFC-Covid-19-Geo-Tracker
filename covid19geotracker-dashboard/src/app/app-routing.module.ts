import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DayTrackingComponent} from './day-tracking/day-tracking.component';


const routes: Routes = [
{path:'day' ,component : DayTrackingComponent},
{path: '', redirectTo: '/day', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
