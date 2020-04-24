import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {ApiService} from '../api.service'
import {People} from '../people'
import * as mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-day-tracking',
  templateUrl: './day-tracking.component.html',
  styleUrls: ['./day-tracking.component.scss']
})
export class DayTrackingComponent  {
people:People[]
people1:People[]
color1:string
  constructor(private api:ApiService) { }
  profileForm = new FormGroup({
    pid: new FormControl(''),
    date: new FormControl(''),
  }
  );
  infectedForm = new FormGroup({
    ipid: new FormControl(''),
  }
  );
  map: mapboxgl.Map;
  marker:mapboxgl.Marker;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 19.110594;
  lng = 74.735584;
 
MapMark(people){
  this.people1 =people
  Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set('mapbox-access-token');
  this.map = new mapboxgl.Map({
    container: 'map',
    style: this.style,
    zoom: 15,
    center: [this.lng, this.lat]
});
// Add map controls
this.map.addControl(new mapboxgl.NavigationControl());
people.forEach(element => {
  if(element.distance<300){
    this.color1='red'
  }
  else{
    this.color1='orange'
  }
new mapboxgl.Marker({color:this.color1}).setLngLat([element.longitude,element.latitude]).addTo(this.map).setDraggable(true).setPopup(new mapboxgl.Popup().setText(
"PID: "+element.pid+"    Status:"+element.status)).togglePopup();
});
people.forEach(element => {
new mapboxgl.Marker({color:'black'}).setLngLat([element.iplongitude,element.iplatitude]).addTo(this.map).setDraggable(true).setPopup(new mapboxgl.Popup().setText(
"PID: "+element.ipid+"   Status:"+element.infstatus)).togglePopup();
});
}

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.profileForm.value)
    this.api.searchPerson(this.profileForm.value)
    .subscribe(data=>{
      console.log(data)
      this.people=data.response
      this.MapMark(this.people);
      
      console.log(this.people)
    })
  }
MarkInfectedPerson(){
  console.log(this.infectedForm.value);
  this.api.MarkPerson(this.infectedForm.value)
  .subscribe(data=>{
    console.log(data)
  }
  )
  alert("Marked the infected Person: "+this.infectedForm.value.ipid);
}


}
