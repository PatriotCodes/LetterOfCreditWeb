import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { NodeMarker } from './../model/node-marker';
import { AgmMarker } from '../../../node_modules/@agm/core/directives/marker';
//import { CordaNodeService } from './../services/corda-node.service';
import { NodeFilter } from './../model/node-filter';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {
  @Input() filter: NodeFilter;
  @Output() markerClick: EventEmitter<NodeMarker> = new EventEmitter();
  nodeMarkers: NodeMarker[] = [];
  filteredNodeMarkers: NodeMarker[] = [];
  backgroundColor = 'black';
  style1 = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8ec3b9"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1a3646"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#64779e"
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#334e87"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6f9ba5"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3C7680"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#304a7d"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2c6675"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#255763"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#b0d5ce"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3a4762"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#0e1626"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#4e6d70"
        }
      ]
    }
  ];

  constructor(/*private cordaNodeService: CordaNodeService*/) { }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.filter.firstChange) {
      this.filterMarkers();
    }
  }

  ngOnInit() {
    //this.cordaNodeService.getCordaNodeMarkers().then(nms => this.setMarkerObjects(nms));
  }

  setMarkerObjects(nodeMarkers: NodeMarker[]) {
    this.nodeMarkers = nodeMarkers;
    this.filteredNodeMarkers = nodeMarkers;
  }

  notify(marker: AgmMarker) {
    const nodeMarker = new NodeMarker().deserialize(marker);
    this.markerClick.emit(nodeMarker);
  }

  nodeIcon(marker: NodeMarker) {
    switch (marker.type) {
      case 'peer':
        return 'assets/images/peer.png';
      case 'oracle':
        return 'assets/images/oracle.png';
      case 'notary':
        return 'assets/images/notary.png';
      default:
        return 'assets/images/heartbeat.gif';
    }
  }

  filterMarkers() {
    if (this.nodeMarkers.length > 0) {
      this.filteredNodeMarkers = [];
      let index;
      for (index = 0; index < this.nodeMarkers.length; ++index) {
        if (this.filterRules(this.nodeMarkers[index])) {
          this.filteredNodeMarkers.push(this.nodeMarkers[index]);
        }
      }
    }
  }

  filterRules(marker: NodeMarker): boolean {
    switch (marker.type) {
      case 'peer':
        return this.filter.peer;
      case 'oracle':
        return this.filter.oracle;
      case 'notary':
        return this.filter.notary;
      case 'businessNetwork':
        return this.filter.businessNetwork;
    }
    return true;
  }
}
