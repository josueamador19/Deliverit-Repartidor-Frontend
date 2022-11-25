let locations = [
    L.latLng(14.059899, -87.220381),
    L.latLng(14.053579, -87.221811)
];

var map1 = L.map('map', { scrollWheelZoom: false });
var control;
var coords = [];


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
    
    coords = await getCoords();
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
        var routes = e.routes;
        var summary = routes[0].summary;
        // alert distance and time in km and minutes
        distance = Number((summary.totalDistance / 1000)).toFixed(2);
        $('#DistanceInfo').html((distance + ' KM'));
        $('#TimeInfo').html((Math.round(summary.totalTime % 3600 / 60)+20)+ ' minutes');
    });

    L.Routing.errorControl(control).addTo(map1);


}

function viewModalOrder(orderBtn) {
    const orderID = $(orderBtn).attr('data-orderindex');
    $('#modalOrder').css('z-index', '999');

    const options = {method: 'GET',credentials: 'include'};

    fetch('http://localhost:3000/roundsman/getOrderInfo/'+orderID, options)
    .then(response => response.json())
    .then(response => {
        $('#idOrder').html(response.id);
        $('#nameClient').html(response.client.name);
        $('#paymentInfo').html(response.payment.credit_card_number);
        $('#ServiceInfo').html(response.service);
        $('#TotalInfo').html(response.total);
        $('#products').html('');
        response['products'].forEach(product => {
            $('#products').append( `<div class="pr row center-y">
            <img width="10%" src="${product.img}" alt="">
            <div class="col infoPr">
                <strong>${product.name}</strong><br>
                <span>${product.store}</span>
            </div>
            <div class="col center-xy price">
                <span>$${product.price}</span>
            </div>
        </div>`)
        });
        
        const locations2 = [];
        
        locations2.push(L.latLng(coords.lat, coords.long))
        response.locations.forEach(location => {
            locations2.push(L.latLng(location.lat, location.lng))
        })
        console.log(locations2);
        
        control.setWaypoints(locations2)
        $('#takeOrderbtn').css('display', 'none')
        $('#otwOrderbtn').css('display', 'none')
        $('#deliveredOrderbtn').css('display', 'none')
        if (response.status === "Received") {
            $('#takeOrderbtn').css('display', 'inline')
            $('#takeOrderbtn').attr('data-idOrder', response.id)
        }
        if (response.status === "Preparing") {
            $('#otwOrderbtn').css('display', 'inline')
            $('#otwOrderbtn').attr('data-idOrder', response.id)
        }
        if (response.status === "OnTheWay") {
            $('#deliveredOrderbtn').css('display', 'inline')
            $('#deliveredOrderbtn').attr('data-idOrder', response.id)
        }
    })

}
