import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-graphical-transactions',
  templateUrl: './graphical-transactions.component.html',
  styleUrls: ['./graphical-transactions.component.scss']
})
export class GraphicalTransactionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  perform(startNode: ElementRef, endNode: ElementRef) {

  }

  createLine(x1, y1, x2, y2) {
    let length = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    let angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    let transform = 'rotate(' + angle + 'deg)';

    let line = $('<div>')
      .appendTo('#page')
      .addClass('line')
      .css({
        'position': 'absolute',
        'transform': transform,
        'height': '3px',
        'background-color': '#fff'
      })
      .width(length)
      .offset({ left: x1, top: y1 });
  }

  sendContract(x1, y1) {
    let contract = $('<img src="assets\contract.svg>')
      .appendTo('.line')
      .addClass('contract')
      .css({
        'position': 'absolute',
      })
      .offset({ left: x1, top: y1 });
  }
}
