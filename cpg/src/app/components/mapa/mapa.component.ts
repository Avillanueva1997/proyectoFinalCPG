import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements AfterViewInit {

  @Input() coords: string;
  @ViewChild('mapa', {static: false}) mapa: any;

  constructor() { }

  ngAfterViewInit() {
    const coords = this.coords.split(',');
    const lat = Number(coords[0]);
    const lng = Number(coords[1]);

    mapboxgl.accessToken = 'pk.eyJ1IjoidmlsbGFudWV2YWFuZ2VsNjgiLCJhIjoiY2swdnczbGRnMTNoeTNpbGE1Y2Yzazc5biJ9.BtfS0yH9oO_o3yFnCv978w';
    const map = new mapboxgl.Map({
    container: this.mapa.nativeElement,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lng, lat],
    zoom: 15
    });

    const marker = new mapboxgl.Marker()
    .setLngLat([lng, lat])
    .addTo(map);
  }

}
