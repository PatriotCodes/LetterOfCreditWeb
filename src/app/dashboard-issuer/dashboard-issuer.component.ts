import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'dashboard-issuer',
  templateUrl: './dashboard-issuer.component.html',
  styleUrls: ['./dashboard-issuer.component.css']
})
export class DashboardIssuerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.panel').addClass('module');
  }
}
