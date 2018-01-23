import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common'
import { LocSummary } from './../loc-summary';
import { LocService } from './../loc.service';

@Component({
  selector: 'goods-shipped',
  templateUrl: './goods-shipped.component.html',
  styleUrls: ['./goods-shipped.component.css']
})
export class GoodsShippedComponent implements OnInit {
  locs: LocSummary[] = []

  constructor(private locService: LocService) { }

    ngOnInit(): void {
      this.locService.getDummySummary().then(locs => this.locs = locs);
    }

}
