"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let MapaComponent = class MapaComponent {
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
};
__decorate([
    core_1.Input()
], MapaComponent.prototype, "coords", void 0);
__decorate([
    core_1.ViewChild('mapa', { static: false })
], MapaComponent.prototype, "mapa", void 0);
MapaComponent = __decorate([
    core_1.Component({
        selector: 'app-mapa',
        templateUrl: './mapa.component.html',
        styleUrls: ['./mapa.component.scss'],
    })
], MapaComponent);
exports.MapaComponent = MapaComponent;
