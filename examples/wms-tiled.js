var layers = [
  new ol.layer.Tile({
    source: new ol.source.OSM()
  }),
  new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: 'http://139.162.41.42:81/cgi-bin/qgis_mapserv.fcgi',
      params: {'MAP': '/var/www/geonode/geonode/qgis_layer/cdd_son_jawa.qgs', 'LAYERS': 'cdd_son_jawa', 'TILED': true},
      serverType: 'geoserver'
    })
  })
];
var map = new ol.Map({
  layers: layers,
  target: 'map',
  view: new ol.View({
    center: [-10997148, 4569099],
    zoom: 4
  })
});
