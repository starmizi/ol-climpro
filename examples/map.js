      /**
       * Elements that make up the popup.
       */
      var container = document.getElementById('popup');
      var content = document.getElementById('popup-content');
      var closer = document.getElementById('popup-closer');


      /**
       * Create an overlay to anchor the popup to the map.
       */
      var overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
        element: container,
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
      }));


      /**
       * Add a click handler to hide the popup.
       * @return {boolean} Don't follow the href.
       */
      closer.onclick = function() {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
      };


      /**
       * Create the map.
       */
      var osm =  new ol.layer.Tile({
            source: new ol.source.OSM()
          });
      var wmsSource = new ol.source.TileWMS({
        url: 'http://139.162.41.42:81/cgi-bin/qgis_mapserv.fcgi',
        params: {'MAP': '/var/www/geonode/geonode/qgis_layer/jatim_adm_4.qgs', 'LAYERS': 'jatim_adm_4', 'TILED': true},
        serverType: 'qgis-server',
        crossOrigin: 'said'
      });
      var wmsLayer = new ol.layer.Tile({
        source: wmsSource
      });
      var view = new ol.View({
        center: ol.proj.transform([110.5, -7.3], 'EPSG:4326', 'EPSG:3857'),
        zoom: 6.5
      });
      var map = new ol.Map({
        layers: [osm, wmsLayer],
        overlays: [overlay],
        target: 'map',
        view: view
      });


      /**
       * Add a click handler to the map to render the popup.
       */
      map.on('singleclick', function(evt) {
        var viewResolution = /** @type {number} */ (view.getResolution());
        var coordinate = evt.coordinate;
        var url = wmsSource.getGetFeatureInfoUrl(
            evt.coordinate, viewResolution, 'EPSG:3857',
            {'INFO_FORMAT': 'text/html'});

        content.innerHTML = '<iframe seamless src="' + url + '"></iframe>';
        overlay.setPosition(coordinate);
      });
