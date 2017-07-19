import { initMapMarkers, initStationMarkers, appendStats } from './markerManager';

export function createBorders(geoString, map) {
  map.data.addGeoJson(geoString);
  map.data.setStyle(function(feature) {
    return ({
      strokeWeight: 1
    });
  });

  map.data.addListener('click', function(event) {
    let neighborhood = event.feature.getProperty('neighborhood');
    $('#neighborhood').textContent = neighborhood;

    let neighborhoodGeo = event.feature.getGeometry();
    let neighborhoodPoly = new google.maps.Polygon({
      paths: neighborhoodGeo.getAt(0).getArray(),
      map: map,
      clickable: false,
      visible: false,
    });

    initMapMarkers(map, neighborhoodPoly, neighborhood);

    map.data.revertStyle();
    map.data.overrideStyle(event.feature, {fillColor: "ghostwhite", strokeWeight: 3.5});

    let lat = event.latLng.lat();
    let lng = event.latLng.lng();
    map.setZoom(14);
    map.panTo(new google.maps.LatLng(lat, lng));

    appendStats();
  });

}