/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PackingListViewComponent } from './packing-list-view.component';

describe('PackingListViewComponent', () => {
  let component: PackingListViewComponent;
  let fixture: ComponentFixture<PackingListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackingListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
