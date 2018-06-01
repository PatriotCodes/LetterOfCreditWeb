import { Component, OnInit } from '@angular/core';
declare var Snap: any;
declare var mina: any;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  let snap = Snap('#svgC');
  let snapPing = Snap('#svgPing');

  // Path
  let pathPing = snapPing.path('M100 0 L400 0 ').attr({
    id: 'squiggle',
    fill: 'none',
    strokeWidth: '4',
    stroke: '#ffffff',
    strokeMiterLimit: '10',
    strokeDasharray: '9 9',
    strokeDashOffset: '988.01'
  });

  let length = pathPing.getTotalLength();

// Animate Path
pathPing.attr({
  stroke: '#fff',
  strokeWidth: 4,
  fill: 'none',
  // Draw Path
  'stroke-dasharray': length + ' ' + length,
  'stroke-dashoffset': length
});

pathPing.animate({
  'stroke-dashoffset': 0
}, 1000, mina.easeinout, function(){second()});

function second() {
  pathPing.animate({'stroke-dashoffset': length}, 1000, mina.easeinout);
}


















// Path
let myPathC = snap.path('M62.9 14.9c-25-7.74-56.6 4.8-60.4 24.3-3.73 19.6 21.6 35 39.6 37.6 42.8 6.2 72.9-53.4 116-58.9 65-18.2 191 101 215 28.8 5-16.7-7-49.1-34-44-34 11.5-31 46.5-14 69.3 9.38 12.6 24.2 20.6 39.8 22.9 91.4 9.05 102-98.9 176-86.7 18.8 3.81 33 17.3 36.7 34.6 2.01 10.2.124 21.1-5.18 30.1').attr({
  id: 'squiggle',
  fill: 'none',
  strokeWidth: '4',
  stroke: '#ffffff',
  strokeMiterLimit: '10',
  strokeDasharray: '9 9',
  strokeDashOffset: '988.01'
});

  // Draw Path
  let len = myPathC.getTotalLength();

  // Animate Path
  myPathC.attr({
    stroke: '#fff',
    strokeWidth: 4,
    fill: 'none',
    // Draw Path
    'stroke-dasharray': '12 6',
    'stroke-dashoffset': '180'
  }).animate({'stroke-dashoffset': 10}, 4500, mina.easeinout);

  // Ship (As Polyline)
  let Ship = snap.path('M85.469,66.016c1.154,0.627,1.938,1.85,1.938,3.255c0,0.471-0.088,0.922-0.248,1.337H13.989L6.439,59.84  c-0.422-0.602-0.669-1.333-0.669-2.123c0-0.803,0.256-1.546,0.69-2.152h21.7l2.573,2.573h43.839l9.085-5.245h10.328L85.469,66.016  L85.469,66.016z M63.877,39.438h12.75v6.8h-12.75V39.438L63.877,39.438z M33.276,48.788h12.75v6.8h-12.75V48.788L33.276,48.788z   M48.576,48.788h12.75v6.8h-12.75V48.788L48.576,48.788z M63.877,48.788h12.75v5.219l-2.739,1.581H63.877V48.788L63.877,48.788z   M33.276,39.438h12.75v6.8h-12.75V39.438L33.276,39.438z M48.576,39.438h12.75v6.8h-12.75V39.438L48.576,39.438z M13.255,37.8  h10.658h2.942v2.55h-2.942v12.664H10.705V42.05v-1.7V37.8v-2.55V32.7h5.692v-2.01l7.516-3.09v5.1h2.942v2.55h-3.792h-9.808V37.8  L13.255,37.8z')
  Ship.attr({
    id: 'plane',
    fill: '#fff'
  });

  let shipGroup = snap.g( Ship ); // Group polyline

  setTimeout( function() {
    Snap.animate(0, len, function( value ) {
       let movePoint = myPathC.getPointAtLength( value );
       shipGroup.transform( 't' + (movePoint.x - 15) + ',' + ( movePoint.y - 15) + 'r' + (movePoint.alpha - 90));
    }, 4500,mina.easeinout);
  });
  }

}
