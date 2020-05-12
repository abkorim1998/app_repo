(function () {

    L.mapbox.accessToken = 'pk.eyJ1IjoiYWJrb3JpbTE5OTgiLCJhIjoiY2thM2kxcDY3MHA5cjNrcDk2YjAya28yNyJ9.K8Qp_jXeCCmgyaxFwBd-IQ';
    var map = L.mapbox.map('map', null, {
        zoomControl: false,
        attributionControl: false,
        bounceAtZoomLimits: false,
        minZoom: 3,
    }
    ).setView([28, 3], 3);
    L.mapbox.styleLayer('mapbox://styles/abkorim1998/cka3ji7yc0h1k1iqzgcpx0feu').addTo(map)

    console.log(map._mapboxLogoControl);

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
            // console.log(country);

            var size;
            size = 10 + country.active / 10 * 3;
            if (size > 50 && size < 100) {
                size = 10
            } else if (size > 100 && size < 1000) {
                size = 20
            } else if (size > 1000 && size < 1500) {
                size = 30
            } else if (size > 1500 && size < 2000) {
                size = 40
            } else if (size > 2000) {
                size = 50
            }

            var korim = L.marker([lat, long], {
                icon: L.divIcon({
                    className: 'css-icon',
                    iconSize: [size, size]
                }),
                data: country,
            }).addTo(map);

            korim.on('click', function (e) {
                var d = e.target.options.data;
                L.popup().setLatLng(e.latlng).setContent(`
                    <h4>
                        <span>${d.country}</span>
                        <img class="flagImage" src="${d.countryInfo.flag}"/>
                    </h4>
                    <span>cases: ${d.cases}</span>
                    <span>deaths: ${d.deaths}</span><br>
                    <span>recovered: ${d.recovered}</span>
                    <span>active: ${d.active}</span><br>
                    <span>todayCases: ${d.todayCases}</span>
                    <span>todayDeaths: ${d.todayDeaths}</span><br>
                `)
                    .openOn(map);

                showData(country);
                console.log(country);
            });

        }
    });

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
        var dateObj = new Date(data.updated);
        var formattedDate = dateObj.customFormat("#DD#/#MM#/#YYYY# #hh#:#mm#:#ss#");
        $('.updated').text(formattedDate);
    }


})();

