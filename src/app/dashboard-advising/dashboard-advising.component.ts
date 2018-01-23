import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'dashboard-advising',
  templateUrl: './dashboard-advising.component.html',
  styleUrls: ['./dashboard-advising.component.css']
})
export class DashboardAdvisingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.panel').addClass('module');
  }

}
