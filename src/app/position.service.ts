import { Injectable, Output, EventEmitter } from '@angular/core';
import { ClientHttpService } from './client-http.service';
import { icon, latLng, marker, Marker, tileLayer, Map, LayerGroup } from 'leaflet';
import { Observable, of } from 'rxjs';
import { POSITIONS } from './mock-positions';
import { Position } from './position';
import { PositionForm } from './customer/choose-area/position-form';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  ICON_URL_RED = '../assets/images/marker-icon-red.png';
  ICON_URL_BLUE = '../assets/images/marker-icon-blue.png';
  SHADOW_URL = '../assets/images/marker-shadow.png';

  minNumberOfVertices = 3;
  maxNumberOfVertices = 20;
  markerIconRed;
  markerIconBlue;
  positionsForSaleBase: Position[] = [];
  positionsForSale: Position[] = []; // Posizioni in vendita
  positionsBought: Position[] = []; // Posizioni comprate
  polygonPosition: Position[] = []; // Posizioni pinnate o scritte nel form
  polygonMarkers: Marker[] = []; // Marker messi nella mappa
  buyablePositionsMarkers: Marker[] = []; // Marker delle posizioni comprabili
  inputPositionsFromForm: Array<PositionForm> = new Array();
  newPosition: Position = new Position();
  dateMin: number;
  dateMax: number;

  @Output() addedPositionFromMap: EventEmitter<Position> = new EventEmitter();
  @Output() addedPositionFromForm: EventEmitter<void> = new EventEmitter();
  @Output() addedPositionForSale: EventEmitter<Marker> = new EventEmitter();
  @Output() removedPositionFromMap: EventEmitter<Position> = new EventEmitter();
  @Output() removedPositionFromForm: EventEmitter<Marker> = new EventEmitter();
  @Output() removedPositionForSale: EventEmitter<Marker> = new EventEmitter();
  @Output() clearAllPositions: EventEmitter<void> = new EventEmitter();
  @Output() newPositionsBought: EventEmitter<Position[]> = new EventEmitter();

  constructor(private client: ClientHttpService) {
    // Marker per le posizioni degli utenti che sono sulla mappa
    this.markerIconRed = icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      popupAnchor: [0, -38],
      iconUrl: this.ICON_URL_RED,
      shadowUrl: this.SHADOW_URL
    });

    // Marker per i punti che vado ad aggiungere io cliccando sulla mappa
    this.markerIconBlue = icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      popupAnchor: [0, -38],
      iconUrl: this.ICON_URL_BLUE,
      shadowUrl: this.SHADOW_URL
    });

    this.dateMin = new Date(2018, 4, 25).valueOf() / 1000;
    this.dateMax = new Date().valueOf() / 1000;

    this.client.getBuyablePositions().subscribe(positions => {
      positions.forEach(p => {
        if (p.timestamp > this.dateMin && p.timestamp < this.dateMax ) {
          const newMarker = marker(latLng(p.latitude, p.longitude),
            { icon: this.markerIconRed })
            .bindPopup('<b>Coordinate:</b><br>LatLng(' + p.latitude + ', ' + p.longitude + ')<br>'
              + new Date(p.timestamp * 1000).toLocaleString());
          this.buyablePositionsMarkers.push(newMarker);
          this.positionsForSaleBase.push(p);
          this.positionsForSale.push(p);
          this.addedPositionForSale.emit(newMarker);
        }
      });
    });

    this.initNewPosition();
   }

  initNewPosition(): void {
    this.newPosition = new Position();
    this.newPosition.latitude = undefined;
    this.newPosition.longitude = undefined;
  }

  getPositionsForSale(): Observable<Position[]> {
    return this.client.getBuyablePositions();
  }

  getPositionsBought(): Observable<Position[]> {
    return this.client.getPositionsBought();
  }

  getPositionsForSaleMarkers(): Observable<Marker[]> {
    return of(this.buyablePositionsMarkers);
  }

  notifyAdditionFromMap(newPositions: Position[], newMarkers: Marker[]): void {
    newPositions.forEach((newPosition, index) => {
      this.polygonPosition.push(newPosition);
      this.polygonMarkers.push(newMarkers[index]);
    });

    this.polygonPosition.forEach(newPosition => { // ODIO LE COSE ASINCRONEEEEEEEEEEE
      this.addedPositionFromMap.emit(newPosition);
    });

  }

  notifyAdditionFromForm(positions: PositionForm[], numberOfForms: number): void {
    this.polygonMarkers = new Array();
    this.polygonPosition = new Array();
    positions.forEach((position, index) => {
      if (index > numberOfForms - 1) {
        return;
      }
      position.save();
      const newMarker = marker(latLng(position.positionValue.latitude, position.positionValue.longitude),
        { icon: this.markerIconBlue })
        .bindPopup('<b>Coordinate:</b><br>LatLng(' + position.positionValue.latitude + ', ' + position.positionValue.longitude + ')'
        );
      this.polygonPosition.push(position.positionValue);
      this.polygonMarkers.push(newMarker);
      this.addedPositionFromForm.emit();
    });
  }

  notifyRemoveAllPosition(): void {
    this.clearAllPositions.emit();
    this.polygonMarkers = [];
    this.polygonPosition = [];
  }

  notifyRemotionFromMap(position: Position): void {
    this.inputPositionsFromForm.pop();
    this.removedPositionFromMap.emit(position);
  }

  notifyRemotionFromForm(index: number): void {
    this.inputPositionsFromForm.pop();
    const toBeRemovedMarker = this.polygonMarkers[index];
    this.removedPositionFromForm.emit(toBeRemovedMarker);
  }

  buyPositionsInArea(polygon: Position[]) {
    this.getPositionsInPolygon(this.polygonPosition).forEach(element => {
      if (this.positionsBought.indexOf(element, 0) === -1) {
        this.positionsBought.push(element);
      }
    });

    this.client.buyPositions(polygon, this.dateMax, this.dateMax);
    this.newPositionsBought.emit(this.positionsBought);
  }

  verifySales() {
    this.positionsForSale.forEach((p, index) => {
      if (p.timestamp < this.dateMin || p.timestamp > this.dateMax) {
        this.removeSale(index);
      }
    });

    this.positionsForSaleBase.forEach( (p) => {
      const i = this.positionsForSale.indexOf(p);
      if (p.timestamp > this.dateMin && p.timestamp < this.dateMax && i === -1) {
          this.newSale(p);
      }
    });
  }

  newSale(position: Position): void {
    const newMarker = marker(latLng(position.latitude, position.longitude),
        { icon: this.markerIconRed })
        .bindPopup('<b>Coordinate:</b><br>LatLng(' + position.latitude + ', ' + position.longitude + ')<br>'
            + new Date(position.timestamp).toLocaleString());
    this.buyablePositionsMarkers.push(newMarker);
    this.positionsForSale.push(position);
    this.addedPositionForSale.emit(newMarker);
  }

  removeSale(index: number): void {
    this.positionsForSale.splice(index, 1);
    const toBeRemovedMarker = this.buyablePositionsMarkers.splice(index, 1)[0];
    this.removedPositionForSale.emit(toBeRemovedMarker);
  }

  getPolygon(): Observable<Position[]> {
    return of(this.polygonPosition);
  }

  private isPositionsInPolygon(point: Position, polygon: Position[]): Boolean {
    const x = point.longitude;
    const y = point.latitude;

    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].longitude, yi = polygon[i].latitude;
        const xj = polygon[j].longitude, yj = polygon[j].latitude;

        const intersect = ((yi > y) !== (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) { inside = !inside; }
    }
    return inside;
  }

  countPositionsInPolygon(polygon: Position[]): number {
    let count = 0;

    for (const pos of this.positionsForSale) {
      if (this.isPositionsInPolygon(pos, polygon)) {
        count++;
      }
    }
    return count;
  }

  getPositionsInPolygon(polygon: Position[]): Position[] {
     const positionList: Position[] = new Array<Position>();

    for (const pos of this.positionsForSale) {
      if (this.isPositionsInPolygon(pos, polygon)) {
        positionList.push(pos);
      }
    }
    return positionList;
  }

  save(positions: Array<PositionForm>): void {
    this.inputPositionsFromForm = positions;
  }

  clearSavedInputPositions(): void {
    this.inputPositionsFromForm = new Array();
  }

  savedFormInstanceState(): boolean {
    return this.inputPositionsFromForm.length !== 0;
  }

  canAddPosition(): boolean {
    return this.polygonPosition.length !== this.maxNumberOfVertices && this.polygonMarkers.length !== this.maxNumberOfVertices;
  }

  removeLastMarker(): Marker {
    return this.polygonMarkers.pop();
  }

  alreadyAddedPosition(position: Position): boolean {
      let added = false;
      this.polygonPosition.forEach(p => {
          if (p.latitude === position.latitude && p.longitude === position.longitude) {
              added = true;
          }
      });

      return added;
  }

  canBeDeleted(mark: Marker): boolean {
    return this.buyablePositionsMarkers.indexOf(mark) !== -1;
  }
}
