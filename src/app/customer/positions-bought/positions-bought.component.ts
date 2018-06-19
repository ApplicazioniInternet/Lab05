import { Component, OnInit } from '@angular/core';
import { Position } from '../../position';
import { PositionService } from '../../position.service';

@Component({
  selector: 'app-positions-bought',
  templateUrl: './positions-bought.component.html',
  styleUrls: ['./positions-bought.component.css']
})
export class PositionsBoughtComponent implements OnInit {
  positions: Position[] = new Array<Position>();

  constructor(private positionService: PositionService) { }

  ngOnInit() {
    this.positionService.newPositionsBought.subscribe(positionBought => {
      this.getBoughtPositions();
    });

    this.getBoughtPositions();
  }

  getBoughtPositions(): void {
    this.positionService.getPositionsBought().subscribe(positions => {
      this.positions = positions;
    });
  }

  getDate(timestamp: number): string {
    return new Date(timestamp).toLocaleString();
  }
}
