let locations = [
    L.latLng(14.059899, -87.220381),
    L.latLng(14.053579, -87.221811)
];

var map1 = L.map('map', { scrollWheelZoom: false });
var control;


window.onload = async () => {

    const getCoords = async () => {
        var userAce = true;
        var pos = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, showError);  
            function showError(error) {
                userAce=false;
                switch(error.code) {
                  case error.PERMISSION_DENIED:
                    reject(new Error("please allow access to the location!"));
                    break;
                  case error.POSITION_UNAVAILABLE:
                    reject(new Error("POSITION_UNAVAILABLE!"));
                    break;
                  case error.TIMEOUT:
                    reject(new Error("TIMEOUT!"));
                    break;
                  case error.UNKNOWN_ERROR:
                    reject(new Error("UNKNOWN_ERROR!"));
                    break;
                }
              }
        })
        .catch(alert);

        if (!userAce) {
            return {
                lat: '14.105944',
                long: '-87.206039',
            };
        }
        
        return {
            long: pos.coords.longitude,
            lat: pos.coords.latitude,
        };
    };
    
    const coords = await getCoords();
    locations.push(L.latLng(coords.lat, coords.long));
        
    window.LRM = {
        tileLayerUrl: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        osmServiceUrl: 'https://routing.openstreetmap.de/routed-car/route/v1',
        orsServiceUrl: 'https://api.openrouteservice.org/geocode/',
        apiToken: '5b3ce3597851110001cf6248ff41dc332def43858dff1ecccdd19bbc'
    };


    

    L.tileLayer(LRM.tileLayerUrl, {
        attribution: 'Maps and routes from <a href="https://www.openstreetmap.org">OpenStreetMap</a>. ' +
            'data uses <a href="http://opendatacommons.org/licenses/odbl/">ODbL</a> license'
    }).addTo(map1);

    function button(label, container) {
        var btn = L.DomUtil.create('button', '', container);
        btn.setAttribute('type', 'button');
        btn.innerHTML = label;
        return btn;
    }

    control = L.Routing.control({
            router: L.routing.osrmv1({
                serviceUrl: LRM.osmServiceUrl
            }),
            routeWhileDragging: false,
            plan: new (L.Routing.Plan.extend({
                createGeocoders: function() {
                    var container = L.Routing.Plan.prototype.createGeocoders.call(this),
                        reverseButton = button('&#8593;&#8595;', container);

                    L.DomEvent.on(reverseButton, 'click', function() {
                        var waypoints = this.getWaypoints();
                        this.setWaypoints(waypoints.reverse());
                    }, this);

                    return container;
                }
            }))(locations, {
                geocoder: L.Control.Geocoder.nominatim(),
                routeWhileDragging: false
            })
        })
        .on('routingerror', function(e) {
            try {
                map1.getCenter();
            } catch (e) {
                map1.fitBounds(L.latLngBounds(control.getWaypoints().map(function(wp) { return wp.latLng; })));
            }
            handleError(e);
        })
        .addTo(map1);
        control._container.style.display = "None";

    

    (function() {
        'use strict';

        L.Routing.routeToGeoJson = function(route) {
            var wpNames = [],
                wpCoordinates = [],
                i,
                wp,
                latLng;

            for (i = 0; i < route.waypoints.length; i++) {
                wp = route.waypoints[i];
                latLng = L.latLng(wp.latLng);
                wpNames.push(wp.name);
                wpCoordinates.push([latLng.lng, latLng.lat]);
            }

            return {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {
                            id: 'waypoints',
                            names: wpNames
                        },
                        geometry: {
                            type: 'MultiPoint',
                            coordinates: wpCoordinates
                        }
                    },
                    {
                        type: 'Feature',
                        properties: {
                            id: 'line',
                        },
                        geometry: L.Routing.routeToLineString(route)
                    }
                ]
            };
        };

        L.Routing.routeToLineString = function(route) {
            var lineCoordinates = [],
                i,
                latLng;

            for (i = 0; i < route.coordinates.length; i++) {
                latLng = L.latLng(route.coordinates[i]);
                lineCoordinates.push([latLng.lng, latLng.lat]);
            }

            return {
                type: 'LineString',
                coordinates: lineCoordinates
            };
        };
    })();


    control.on('routesfound', function(e) {
        console.log(L.Routing.routeToGeoJson(e.routes[0]));
    });

    L.Routing.errorControl(control).addTo(map1);


}

function viewModalOrder(orderBtn) {
    const orderID = $(orderBtn).attr('data-orderindex');
    const order = orders.find(ordert => ordert.ID == orderID);
    console.log(orderID);
    $('#modalOrder').css('z-index', '999');
    $('#idOrder').html(order.ID);
    
    const locations2 = [
        L.latLng(14.059899, -87.220381),
        L.latLng(14.053579, -87.221811)
    ];
    
    control.setWaypoints(locations2.reverse())
}
