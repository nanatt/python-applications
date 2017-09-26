var layer = new ol.layer.Tile({
       source: new ol.source.OSM()
     });
     var london = ol.proj.transform([-0.12755, 51.507222], 'EPSG:4326', 'EPSG:3857');
     var rome = ol.proj.transform([12.5, 41.9], 'EPSG:4326', 'EPSG:3857');
     var view = new ol.View({
       center: london,
       zoom: 6
     });
     var map = new ol.Map({
       target: 'map',
       layers: [layer],
       view: view
     });

     function doBounce(location) {
       // bounce by zooming out one level and back in
       var bounce = ol.animation.bounce({
         resolution: map.getView().getResolution() * 2
       });
       // start the pan at the current center of the map
       var pan = ol.animation.pan({
         source: map.getView().getCenter()
       });
       map.beforeRender(bounce);
       map.beforeRender(pan);
       // when we set the center to the new location, the animated move will
       // trigger the bounce and pan effects
       map.getView().setCenter(location);
     }
     function doPan(location) {
       // pan from the current center
       var pan = ol.animation.pan({
         source: map.getView().getCenter()
       });
       map.beforeRender(pan);
       // when we set the new location, the map will pan smoothly to it
       map.getView().setCenter(location);
     }
     function doRotate() {
       // rotate 360 degrees
       var rotate = ol.animation.rotate({
         rotation: Math.PI * 2
       });
       map.beforeRender(rotate);
     }
     function doZoom(factor) {
       // zoom from the current resolution
       var zoom = ol.animation.zoom({
         resolution: map.getView().getResolution()
       });
       map.beforeRender(zoom);
       // setting the resolution to a new value will smoothly zoom in or out
       // depending on the factor
       map.getView().setResolution(map.getView().getResolution() * factor);
     }
