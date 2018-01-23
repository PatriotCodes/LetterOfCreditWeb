import { Component, OnInit, Input } from '@angular/core';
import { LocService } from './../loc.service';
import { LocSummary } from './../loc-summary'
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.css']
})
export class ShipComponent implements OnInit {
  @Input() loc: LocSummary

  constructor(private locService: LocService) { }

  ngOnInit() {
  }
}
