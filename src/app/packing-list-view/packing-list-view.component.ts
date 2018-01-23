import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PackingList } from './../packinglist'
import { DocsService } from './../services/docs.service'
import { ViewPlModalComponent } from './../modals/view-pl-modal.component'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'packing-list-view',
  templateUrl: './packing-list-view.component.html',
  styleUrls: ['./packing-list-view.component.scss']
})
export class PackingListViewComponent implements OnChanges {
  @Input() id: string
  @Input() requestor: string
  pl: PackingList;

  constructor(
    private docsService: DocsService,
    private modalComponent: ViewPlModalComponent,
    private modalService: BsModalService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.id[0] !== undefined) {
      this.docsService.getPackingList(this.id, this.requestor).then(pl => this.pl = pl);
    }
  }

}
