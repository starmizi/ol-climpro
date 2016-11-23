var view = new ol.View({
  center: [-4808600, -2620936],
  zoom: 8
});

var map1 = new ol.Map({
  layers: [
    new ol.layer.Tile({
      preload: Infinity,
      source: new ol.source.BingMaps({
        key: 'AkGbxXx6tDWf1swIhPJyoAVp06H0s0gDTYslNWWHZ6RoPqMpB9ld5FY1WutX8UoF',
        imagerySet: 'Aerial'
      })
    })
  ],
  target: 'map1',
  view: view
});

var map2 = new ol.Map({
  layers: [
    new ol.layer.Tile({
      preload: 0, // default value
      source: new ol.source.BingMaps({
        key: 'AkGbxXx6tDWf1swIhPJyoAVp06H0s0gDTYslNWWHZ6RoPqMpB9ld5FY1WutX8UoF',
        imagerySet: 'AerialWithLabels'
      })
    })
  ],
  target: 'map2',
  view: view
});