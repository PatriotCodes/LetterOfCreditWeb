import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { RefreshService } from './../services/refresh.service';
import { SpinnerComponent } from './../spinner/spinner.component';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'modal-content',
  styleUrls: ['./modal.component.css'],
  template: `

  <div id="wrapper">
  <spinner></spinner>
  <br>
  <br>
  <div class="svg">
  <svg width="100%" height="100%" viewBox="170 100 200 200" xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
  <path id="path">
     <animate attributeName="d" from="m0,110 h0" to="m0,110 h1100" dur="1s" begin="0s" repeatCount="1"/>
   </path>
   <text font-size="12" font-family="Montserrat" fill='hsla(36, 95%, 85%, 1)'>
     <textPath xlink:href="#path">{{message}}
     </textPath>
   </text>
 </svg>
 </div>


</div>
`
})
export class ResponseModalComponent implements OnInit {
  public title: string;
  public message: string;
  public body: string;
  constructor(public bsModalRef: BsModalRef,
              private refreshService: RefreshService) {}

  public close() {
    this.bsModalRef.hide();
  }

  updateMessage(text: string) {
    this.message = text;
  }

  ngOnInit(): void {
    Observable.timer(500).subscribe(t => { this.updateMessage('Running') })
    // Observable.timer(100).subscribe(t => { this.updateMessage('Building Transaction') })
    // Observable.timer(1100).subscribe(t => { this.updateMessage('Verifying States') })
    // Observable.timer(2100).subscribe(t => { this.updateMessage('Gathering Signatures') })
    // Observable.timer(3100).subscribe(t => { this.updateMessage('Commiting to Ledger') })
    // Observable.timer(4100).subscribe(t => { this.updateMessage(this.body) })
    Observable.timer(1200).subscribe(t => { this.close() })
    Observable.timer(1200).subscribe(t => { this.refreshService.confirmMission() })
  }
}
