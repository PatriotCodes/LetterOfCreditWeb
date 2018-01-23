import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Cash } from './../cash'
import { LocService } from './../loc.service'
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { RefreshService } from './../services/refresh.service';
declare var $: any;

@Component({
  selector: 'cash-balance',
  templateUrl: './cash-balance.component.html',
  styleUrls: ['./cash-balance.component.css']
})
export class CashBalanceComponent implements OnInit {
  @Input() node: string;
  cashBalances: Cash

  constructor(private locService: LocService,
              private route: ActivatedRoute,
              private refreshService: RefreshService) {
                refreshService.missionConfirmed$.subscribe(
                  result => {
                    this.getCashBalances();
                  });
               }

  getCashBalances() {
    let id = this.route.snapshot.url[0].toString();
    this.locService.getCashBalances(id).then(cashBalances => this.cashBalances = cashBalances);
  }

  ngOnInit() {
    this.getCashBalances();
  }
}
