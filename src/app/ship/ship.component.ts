import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LocService } from './../loc.service';
import { LocStateSummary } from './../loc-state-summary'
import 'rxjs/add/operator/switchMap';
import { ShipModalComponent } from '../modals/ship-modal.component';
import { StatusService } from '../services/status.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.css']
})
export class ShipComponent implements OnInit {
  @Input() id: string;

  constructor(private locService: LocService, private modalComponent: ShipModalComponent, private statusService: StatusService) { }

  ngOnInit(): void {
    //this.statusService.shipAnimation = true;
  }

  confirm() {
    this.locService.shipGoods(this.id);
    this.statusService.shipAnimation = true;
    Observable.interval(1300).subscribe(x => {
      this.statusService.shipAnimation = false;
      this.modalComponent.close();
    });
  }

}
