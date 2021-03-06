var osm =  new ol.layer.Tile({
      source: new ol.source.OSM()
    });

var wmsSource = new ol.source.TileWMS({
  url: 'http://139.162.41.42:81/cgi-bin/qgis_mapserv.fcgi',
  params: {'MAP': '/var/www/geonode/geonode/qgis_layer/lc_jatim.qgs', 'LAYERS': 'lc_jatim', 'TILED': true},
  serverType: 'qgis-server',
  crossOrigin: 'said'
});

var wmsLayer = new ol.layer.Tile({
  source: wmsSource
});

var view = new ol.View({
  center: [0, 0],
  zoom: 5
});

var map = new ol.Map({
  layers: [osm, wmsLayer],
  target: 'map',
  view: view
});

map.on('singleclick', function(evt) {
  document.getElementById('info').innerHTML = '';
  var viewResolution = /** @type {number} */ (view.getResolution());
  var url = wmsSource.getGetFeatureInfoUrl(
      evt.coordinate, viewResolution, 'EPSG:3857',
      {'INFO_FORMAT': 'text/html'});
  if (url) {
    document.getElementById('info').innerHTML =
        '<iframe seamless src="' + url + '"></iframe>';
  }
});

map.on('pointermove', function(evt) {
  if (evt.dragging) {
    return;
  }
  var pixel = map.getEventPixel(evt.originalEvent);
  var hit = map.forEachLayerAtPixel(pixel, function() {
    return true;
  });
  map.getTargetElement().style.cursor = hit ? 'pointer' : '';
});
