var map, marker;
function initMap() {

    var grayStyles = [
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f5f5f5"
                }
            ]
        },
        {
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#616161"
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#f5f5f5"
                }
            ]
        },
        {
            "featureType": "administrative.country",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#004000"
                },
                {
                    "weight": 0.5
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#bdbdbd"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#eeeeee"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e5e5e5"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dadada"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#616161"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e5e5e5"
                }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#eeeeee"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#c9c9c9"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        }
    ];


    // 17.3901046,-13.0342503
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        minZoom: 1,
        center: { lat: 17, lng: 13 },
        styles: grayStyles,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false,
        mapTypeControl: false,
    });


    var settings = {
        "url": "https://corona.lmao.ninja/v2/countries",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        for (let i = 0; i < response.length; i++) {
            const country = response[i];
            var lat = country.countryInfo.lat;
            var long = country.countryInfo.long;
            setMarkert(lat, long, country);
            // console.log(country);
        }
    });

    var tooltip = "<font color='green'>This is some text!</font> another text";
    function setMarkert(lat, lag, country) {
        var latLng = new google.maps.LatLng(lat, lag);
        marker = new google.maps.Marker({
            position: latLng,
            map: map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: "red",
                fillOpacity: .2,
                strokeWeight: .5,
                strokeColor: 'white',
            },
            title: tooltip,
            customInfo: country,
        });

        marker.addListener('click', function () {
            showData(this.customInfo);
            doThisStyle()
        });
    }

    function showData(data) {
        $('.country').text(data.country);
        $('.cases').text(data.cases);
        $('.todayCases').text(data.todayCases);
        $('.deaths').text(data.deaths);
        $('.todayDeaths').text(data.todayDeaths);
        $('.recovered').text(data.recovered);
        $('.active').text(data.active);
        $('.critical').text(data.critical);
        $('.casesPerOneMillion').text(data.casesPerOneMillion);
        $('.deathsPerOneMillion').text(data.deathsPerOneMillion);
        var dateObj =  new Date(data.updated);
        var formattedDate = dateObj.customFormat( "#DD#/#MM#/#YYYY# #hh#:#mm#:#ss#" );
        
        $('.updated').text(formattedDate);
    }

    function doThisStyle() {
        map.data.setStyle(function(feature) {
            var color = 'green';
            if (feature.getProperty('wb_a2') === "AU") {
                color = 'red';
            }
            if (feature.getProperty('wb_a2') === "IR") {
                color = 'yellow';
            }
            return /** @type {google.maps.Data.StyleOptions} */({
                fillColor: color,
                strokeColor: color,
                strokeWeight: 2
            });
        });
    }

    




}

