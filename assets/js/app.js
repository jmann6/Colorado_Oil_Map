var map, featureList, salesSearch = [], customerSearch = [], newCustomerSearch = [], quoteSearch = [], serviceFailureSearch = [];

$(document).on("click", ".feature-row", function(e) {
  sidebarClick(parseInt($(this).attr('id')));
});

$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  return false;
});

$("#full-extent-btn").click(function() {
  map.fitBounds(salesTerritory.getBounds());
  return false;
});

$("#legend-btn").click(function() {
  $("#legendModal").modal("show");
  return false;
});

$("#login-btn").click(function() {
  $("#loginModal").modal("show");
  return false;
});

$("#list-btn").click(function() {
  $('#sidebar').toggle();
  map.invalidateSize();
  return false;
});

$("#list-btn2").click(function() {
    $('#sidebar2').toggle();
    map.invalidateSize();
    return false;
});

$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#sidebar-toggle-btn").click(function() {
  $("#sidebar").toggle();
    map.invalidateSize();
  return false;
});

$("#sidebar-hide-btn").click(function() {
  $('#sidebar').hide();
  map.invalidateSize();
});

$("#sidebar-toggle-btn2").click(function() {
    $("#sidebar2").toggle();
    map.invalidateSize();
    return false;
});

$("#sidebar-hide-btn2").click(function() {
    $('#sidebar2').hide();
    map.invalidateSize();
});

$("#filterButton").click(function(){
    $("#sidebar2").show();
    map.invalidateSize();
});

function sidebarClick(id) {
  map.addLayer(customerLayer).addLayer(newCustomerLayer).addLayer(quotesLayer).addLayer(serviceFailureLayer);
  var layer = markerClusters.getLayer(id);
  markerClusters.zoomToShowLayer(layer, function() {
    map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
    layer.fire("click");
  });

  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    $("#sidebar").hide();
    map.invalidateSize();
  }
}

/* Basemap Layers */
L.mapbox.accessToken = 'pk.eyJ1IjoiamFzb25ob3dhcmQxMjMiLCJhIjoiOW5VWDdhUSJ9.mt0FIYS_tngUPcFzJER1rw';  <!-- Jason's token -->
//L.mapbox.accessToken = 'pk.eyJ1IjoiYm9iYnlzdWQiLCJhIjoiTi16MElIUSJ9.Clrqck--7WmHeqqvtFdYig';  <!-- Bobby's token from github -->
var mapquestOSM = L.mapbox.tileLayer('jasonhoward123.jk0njpal');

/*
var mapquestOSM = L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png", {
  maxZoom: 19,
  subdomains: ["otile1", "otile2", "otile3", "otile4"],
  attribution: 'Tiles courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA.'
});
*/
// var topographicalMap = L.mapbox.tileLayer('bobbysud.023d9591'); /* Taken from github account...waiting for free public version?  */

var terrainMap = L.mapbox.tileLayer('jasonhoward123.jljdh91o');

var temperature = L.tileLayer.wms('http://gis.srh.noaa.gov/arcgis/services/NDFDTemps/MapServer/WMSServer', {
    format: 'img/png',
    transparent: true,
    layers: 16
});
var precipitation = L.tileLayer.wms('http://nowcoast.noaa.gov/wms/com.esri.wms.Esrimap/obs', {
    format: 'image/png',
    transparent: true,
    layers: 'RAS_RIDGE_NEXRAD'
});
var mapquestOAM = L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg", {
  maxZoom: 18,
  subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"],
  attribution: 'Tiles courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a>. Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
});
var mapquestHYB = L.layerGroup([L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg", {
  maxZoom: 18,
  subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"]
}), L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/hyb/{z}/{x}/{y}.png", {
  maxZoom: 19,
  subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"],
  attribution: 'Labels courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA. Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
})]);

/* Overlay Layers */
/*
var highlight = L.geoJson(null);
*/

var salesTerritory = L.geoJson(null, {
  style: function (feature) {
	    switch (feature.properties.user_id) {
	    	case "BRRO": return {fillColor: "#005432", color: "#000", weight: 1, fillOpacity: 0.7, clickable: true};
	    	case "DAWS": return {fillColor: "#003399", color: "#000", weight: 1, fillOpacity: 0.3, clickable: true};
	        case "DENX": return {fillColor: "#000000", color: "#000", weight: 1, fillOpacity: 0.3, clickable: true};
	        case "IAHX": return {fillColor: "#000000", color: "#000", weight: 1, fillOpacity: 0.3, clickable: true};
	        case "JAMT": return {fillColor: "#3366FF", color: "#000", weight: 1, fillOpacity: 0.3, clickable: true};
	        case "JASM": return {fillColor: "#6600FF", color: "#000", weight: 1, fillOpacity: 0.3, clickable: true};
	        case "EVON": return {fillColor: "#CC00FF", color: "#000", weight: 1, fillOpacity: 0.3, clickable: true};
	        case "MAPE": return {fillColor: "#566777", color: "#000", weight: 1, fillOpacity: 0.3, clickable: true};
	        case "MICO": return {fillColor: "#FF0066", color: "#000", weight: 1, fillOpacity: 0.3, clickable: true};
	        case "NABR": return {fillColor: "#FF6600", color: "#000", weight: 1, fillOpacity: 0.3, clickable: true};
	        case "NAVO": return {fillColor: "#666999", color: "#000", weight: 1, fillOpacity: 0.3, clickable: true};
	        case "PALE": return {fillColor: "#009900", color: "#000", weight: 1, fillOpacity: 0.3, clickable: true};
	        case "PERI": return {fillColor: "#66FF66", color: "#000", weight: 1, fillOpacity: 0.3, clickable: true};
	        case "REPF": return {fillColor: "#FFFF00", color: "#000", weight: 1, fillOpacity: 0.3, clickable: true};
	        case "REWE": return {fillColor: "#66FFFF", color: "#000", weight: 1, fillOpacity: 0.3, clickable: true};
	        case "MEMU": return {fillColor: "#66FFFF", color: "#000", weight: 1, fillOpacity: 0.3, clickable: true};
	        case "STFA": return {fillColor: "#FF3300", color: "#000", weight: 1, fillOpacity: 0.3, clickable: true};
	        case "TIKO": return {fillColor: "#996633", color: "#000", weight: 1, fillOpacity: 0.3, clickable: true};
	        case "TRGA": return {fillColor: "#FFFFFF", color: "#000", weight: 1, fillOpacity: 0.3, clickable: true};
	        case "TRLI": return {fillColor: "#ff0000", color: "#000", weight: 1, fillOpacity: 0.3, clickable: true};
	        case "XXXX": return {fillColor: "#000000", color: "#000", weight: 1, fillOpacity: 0.3, clickable: true};
		   }
  },
  onEachFeature: function (feature, layer) {
    salesSearch.push({
      name: layer.feature.properties.user_id,
      source: "salesTerritory",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });
  }
});

$.getJSON("data/TerritoriesGeom.json", function (data) {
    salesTerritory.addData(data);
});


/*
var citadelRoutes = L.geoJson(null, {
  style: function (feature) {
    if (feature.properties.ExpenseQuoted > 3000) {
      return {
        color: "#339933",
        weight: 3,
        opacity: 1
      };

    }
    if (feature.properties.PricePerMile > "15") {
      return {
        color: "#2ca25f",
        weight: 4,
        opacity:1
      };
    }
    if (feature.properties.route_id === "7") {
      return {
        color: "#ce06cb",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "A" || feature.properties.route_id === "C" || feature.properties.route_id === "E" || feature.properties.route_id === "SI" || feature.properties.route_id === "H") {
      return {
        color: "#fd9a00",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "Air") {
      return {
        color: "#ffff00",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "B" || feature.properties.route_id === "D" || feature.properties.route_id === "F" || feature.properties.route_id === "M") {
      return {
        color: "#ffff00",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "G") {
      return {
        color: "#9ace00",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "FS" || feature.properties.route_id === "GS") {
      return {
        color: "#6e6e6e",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "J" || feature.properties.route_id === "Z") {
      return {
        color: "#976900",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "L") {
      return {
        color: "#969696",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "N" || feature.properties.route_id === "Q" || feature.properties.route_id === "R") {
      return {
        color: "#ffff00",
        weight: 3,
        opacity: 1
      };
    }
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
		var content = "<table class='table table-striped table-bordered table-condensed'>" + 
      		"<tr><th>Consignee Solo Key</th><td>" + feature.properties.ConsigneeSoloKey + "</td></tr>" +
      		"<tr><th>Route Date Key</th><td>" + feature.properties.RouteDateKey + "</td></tr>" +
      		"<tr><th>Price Per Mile</th><td>" + feature.properties.PricePerMile + "</td></tr>" +
      		"<tr><th>Price Per Hour</th><td>" + feature.properties.PricePerHour + "</td></tr>" +
      		"<tr><th>Logbook Key</th><td>" + feature.properties.logbook_key + "</td></tr>" +
            "<tr><th>Hours at 50 mph</th><td>" + feature.properties.Hours_at_50mph + "</td></tr>" +
            "<tr><th>Route Service</th><td>" + feature.properties.RouteService + "</td></tr>" +
      		"<tr><th>Shipper Solo Key</th><td>" + feature.properties.ShipperSoloKey + "</td></tr>" +
            "<tr><th>Expense Quoted</th><td>" + feature.properties.ExpenseQuoted + "</td></tr>" +
            "<tr><th>Routes Key</th><td>" + feature.properties.Routes_key + "</td></tr>" + "<table>";      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.ConsigneeSoloKey);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([e.latlng.lat, e.latlng.lng], {
            stroke: false,
            fillColor: "#00FFFF",
            fillOpacity: 0.7,
            radius: 10
          }));
        }
      });
    }
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 2,
          color: "#00FFFF",
          opacity:.5
        });
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
      },
      mouseout: function (e) {
          citadelRoutes.resetStyle(e.target);
      }
    });
  }
});
/* Commented out getjson so page will load faster during development. 10-15-2014. Uncomment to bring back All Citadel Routes Layer */

$.getJSON("data/permits.json", function (data) {
    citadelRoutes.addData(data);
});

var expenseQuoted = L.geoJson(null, {
    style: function (feature) {
        if (feature.properties.ExpenseQuoted > 3000) {
            return {
                color: "#339933",
                weight: 3,
                opacity:1
            };
        }
        else {
            return {
                color: "#000099",
                weight: 2,
                opacity:.5
            };
        }
    },
    onEachFeature: function (feature, layer) {
        if (feature.properties.ExpenseQuoted > 3000) {
            var content = "<table class='table table-striped table-bordered table-condensed'>" +
                "<tr><th>Consignee Solo Key</th><td>" + feature.properties.ConsigneeSoloKey + "</td></tr>" +
                "<tr><th>Route Date Key</th><td>" + feature.properties.RouteDateKey + "</td></tr>" +
                "<tr><th>Price Per Mile</th><td>" + feature.properties.PricePerMile + "</td></tr>" +
                "<tr><th>Price Per Hour</th><td>" + feature.properties.PricePerHour + "</td></tr>" +
                "<tr><th>Logbook Key</th><td>" + feature.properties.logbook_key + "</td></tr>" +
                "<tr><th>Hours at 50 mph</th><td>" + feature.properties.Hours_at_50mph + "</td></tr>" +
                "<tr><th>Route Service</th><td>" + feature.properties.RouteService + "</td></tr>" +
                "<tr><th>Shipper Solo Key</th><td>" + feature.properties.ShipperSoloKey + "</td></tr>" +
                "<tr><th>Expense Quoted</th><td>" + feature.properties.ExpenseQuoted + "</td></tr>" +
                "<tr><th>Routes Key</th><td>" + feature.properties.Routes_key + "</td></tr>" + "<table>";      layer.on({
                click: function (e) {
                    $("#feature-title").html(feature.properties.ConsigneeSoloKey);
                    $("#feature-info").html(content);
                    $("#featureModal").modal("show");
                    highlight.clearLayers().addLayer(L.circleMarker([e.latlng.lat, e.latlng.lng], {
                        stroke: false,
                        fillColor: "#00FFFF",
                        fillOpacity: 0.7,
                        radius: 10
                    }));
                }
            });
        }
        layer.on({
            mouseover: function (e) {
                var layer = e.target;
                layer.setStyle({
                    weight: 3,
                    color: "#00FFFF",
                    opacity: 1
                });
                if (!L.Browser.ie && !L.Browser.opera) {
                    layer.bringToFront();
                }
            },
            mouseout: function (e) {
                expenseQuoted.resetStyle(e.target);
            }
        });
    }
});
/* Commented out getjson so page will load faster during development. 10-15-2014. Uncomment to bring back All Citadel Routes Layer */

$.getJSON("data/permits.json", function (data) {
    expenseQuoted.addData(data);
});



/* Single marker cluster layer to hold all clusters */
var markerClusters = new L.MarkerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  disableClusteringAtZoom: 16
});

/* Empty layer placeholder to add to layer control for listening when to add/remove customers to markerClusters layer */
var customerLayer = L.geoJson(null);
var customer = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
		iconUrl: "assets/img/CAP_Icon_dark.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.description,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties.ExpenseQuoted > 3000) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + 
      	"<tr><th>Name</th><td>" + feature.properties.description + "</td></tr>" +
      	"<tr><th>Solo Key</th><td>" + feature.properties.solo_key + "</td></tr>" + 
      	"<tr><th>Status</th><td>" + feature.properties.cb_status + "</td></tr>" + 
      	"<tr><th>Address</th><td>" + feature.properties.ph_street1 + "</td></tr>" +
      	"<tr><th>City</th><td>" + feature.properties.ph_city + "</td></tr>" + 
      	"<tr><th>State</th><td>" + feature.properties.ph_state + "</td></tr>" + 
      	"<tr><th>Zip Code</th><td>" + feature.properties.solo_key + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.description);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            stroke: false,
            fillColor: "#00FFFF",
            fillOpacity: 0.7,
            radius: 10
          }));
        }
      });
      /*
      $("#feature-list tbody").append('<tr class="feature-row" id="'+L.stamp(layer)+'"><td style="vertical-align: middle;"><img width="20" height="22" src="assets/img/CAP_Icon_dark.png"></td><td class="feature-name">'+layer.feature.properties.description+'</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
        customerSearch.push({
        name: layer.feature.properties.description,
        address: layer.feature.properties.ph_street1,
        source: "customer",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
      */
    }
  }
});
/*
$.getJSON("data/CustomersGeo.json", function (data) {
    customer.addData(data);
  map.addLayer(customerLayer);
});
*/

/* Empty layer placeholder to add to layer control for listening when to add/remove New Customers to markerClusters layer */
var newCustomerLayer = L.geoJson(null);
var newCustomer = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
      return L.marker(latlng, {
          icon: L.AwesomeMarkers.icon({
              icon: 'glyphicon glyphicon-flag',
              iconColor: 'black'
          }),
      title: feature.properties.CustomerName,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
    	var content = "<table class='table table-striped table-bordered table-condensed'>" + 
      		"<tr><th>New Customer</th><td>" + feature.properties.CustomerName + "</td></tr>" +
      		"<tr><th>City</th><td>" + feature.properties.City + "</td></tr>" + 
      		"<tr><th>State</th><td>" + feature.properties.State + "</td></tr>" + 
      		"<tr><th>Sales Person</th><td>" + feature.properties.SalesPerson + "</td></tr>" + 
      		"<tr><th>Tracking Number</th><td>" + feature.properties.TrackingNumber + "</td></tr>" +
      		"<tr><th>Address</th><td>" + feature.properties.StreetAddress + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.CustomerName);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            stroke: false,
            fillColor: "#00FFFF",
            fillOpacity: 0.7,
            radius: 10
          }));
        }
      });
      /*
      $("#feature-list tbody").append('<tr class="feature-row" id="'+L.stamp(layer)+'"><td style="vertical-align: middle;"><span class="glyphicon glyphicon-flag"></span></td><td class="feature-name">'+layer.feature.properties.CustomerName+'</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      newCustomerSearch.push({
        name: layer.feature.properties.CustomerName,
        address: layer.feature.properties.city,
        source: "newCustomer",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
      */
    }
  }
});
/*
$.getJSON("data/ObjCustomerNewBusiness.json", function (data) {
  newCustomer.addData(data);
});
*/

/* Empty layer placeholder to add to layer control for listening when to add/remove Quotes to markerClusters layer */
/* Service Failure Layer Below.  Update variables.  */

var serviceFailureLayer = L.geoJson(null);
var serviceFailure = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: L.AwesomeMarkers.icon({
                icon: 'glyphicon glyphicon-exclamation-sign',
                iconColor: '#990000',
                spin: true
            }),
            title: feature.properties.CustomerName,
            riseOnHover: true
        });
    },

    onEachFeature: function (feature, layer) {
        if (feature.properties) {
            var content = "<table class='table table-striped table-bordered table-condensed'>" +
                "<tr><th>Customer Name</th><td>" + feature.properties.CustomerName + "</td></tr>" +
                "<tr><th>City</th><td>" + feature.properties.City + "</td></tr>" +
                "<tr><th>State</th><td>" + feature.properties.State + "</td></tr>" +
                "<tr><th>Description</th><td>" + feature.properties.description + "</td></tr>" +
                "<tr><th>Sales Person</th><td>" + feature.properties.SalesPerson + "</td></tr>" +
                "<tr><th>Customer Id</th><td>" + feature.properties.CustomerId + "</td></tr>" + "<table>";
            layer.on({
                click: function (e) {
                    $("#feature-title").html(feature.properties.CustomerName);
                    $("#feature-info").html(content);
                    $("#featureModal").modal("show");
                    highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
                        stroke: false,
                        fillColor: "#00FFFF",
                        fillOpacity: 0.7,
                        radius: 10
                    }));
                }
            });
            /*
            $("#feature-list tbody").append('<tr class="feature-row" id="'+L.stamp(layer)+'"><td style="vertical-align: middle;"><span class="glyphicon glyphicon-exclamation-sign"></span></td><td class="feature-name">'+layer.feature.properties.CustomerName+'</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
            serviceFailureSearch.push({
                name: layer.feature.properties.CustomerName,
                address: layer.feature.properties.City,
                source: "Quotes",
                id: L.stamp(layer),
                lat: layer.feature.geometry.coordinates[1],
                lng: layer.feature.geometry.coordinates[0]
            });
            */
        }
    }
});
/*
$.getJSON("data/GeoObjViewCustomersServiceFailures.json", function (data) {
    serviceFailure.addData(data);
});
*/

/* QUOTES LAYER  */
var quotesLayer = L.geoJson(null);
var quotes = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: L.AwesomeMarkers.icon({
                icon: 'glyphicon glyphicon-comment',
                iconColor: 'black'
            }),
            title: feature.properties.CustomerName,
            riseOnHover: true
        });
    },
    onEachFeature: function (feature, layer) {
        if (feature.properties) {
            var content = "<table class='table table-striped table-bordered table-condensed'>" +
                "<tr><th>Customer Name</th><td>" + feature.properties.CustomerName + "</td></tr>" +
                "<tr><th>City</th><td>" + feature.properties.City + "</td></tr>" +
                "<tr><th>State</th><td>" + feature.properties.State + "</td></tr>" +
                "<tr><th>Description</th><td>" + feature.properties.description + "</td></tr>" +
                "<tr><th>Sales Person</th><td>" + feature.properties.SalesPerson + "</td></tr>" +
                "<tr><th>Customer Id</th><td>" + feature.properties.CustomerId + "</td></tr>" + "<table>";
            layer.on({
                click: function (e) {
                    $("#feature-title").html(feature.properties.CustomerName);
                    $("#feature-info").html(content);
                    $("#featureModal").modal("show");
                    highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
                        stroke: false,
                        fillColor: "#00FFFF",
                        fillOpacity: 0.7,
                        radius: 10
                    }));
                }
            });
            /*
            $("#feature-list tbody").append('<tr class="feature-row" id="'+L.stamp(layer)+'"><td style="vertical-align: middle;"><span class="glyphicon glyphicon-exclamation-sign"></span></td><td class="feature-name">'+layer.feature.properties.CustomerName+'</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
            quoteSearch.push({
                name: layer.feature.properties.CustomerName,
                address: layer.feature.properties.City,
                source: "Quotes",
                id: L.stamp(layer),
                lat: layer.feature.geometry.coordinates[1],
                lng: layer.feature.geometry.coordinates[0]
            });
            */
        }
    }
});
/*
$.getJSON("data/GeoObjViewCustomersQuotesPending.json", function (data) {
    quotes.addData(data);
});
*/

/* Brad Rogers Pins LAYER  */
var brroPinsLayer = L.geoJson(null);
var brroPins = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: L.AwesomeMarkers.icon({
                icon: 'glyphicon glyphicon-map-marker',
                iconColor: '#005432'
            }),
            title: feature.properties.CustomerName,
            riseOnHover: true
        });
    },
    onEachFeature: function (feature, layer) {
        if (feature.properties) {
            var content = "<table class='table table-striped table-bordered table-condensed'>" +
                "<tr><th>Customer Name</th><td>" + feature.properties.CustomerName + "</td></tr>" +
                "<tr><th>City</th><td>" + feature.properties.City + "</td></tr>" +
                "<tr><th>State</th><td>" + feature.properties.State + "</td></tr>" +
                "<tr><th>Description</th><td>" + feature.properties.description + "</td></tr>" +
                "<tr><th>Customer Id</th><td>" + feature.properties.solo_key + "</td></tr>" + "<table>";
            layer.on({
                click: function (e) {
                    $("#feature-title").html(feature.properties.CustomerName);
                    $("#feature-info").html(content);
                    $("#featureModal").modal("show");
                    highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
                        stroke: false,
                        fillColor: "#00FFFF",
                        fillOpacity: 0.7,
                        radius: 10
                    }));
                }
            });

        }
    }
});
/*
$.getJSON("data/GeoCustomerMarkerDescriptionBRRO.json", function (data) {
    brroPins.addData(data);
});
*/

map = L.map("map", {
  zoom: 5,
//  center: [39.61, -105.02],  /* Denver Zoom Level 10 */
    center: [39.011, -98.4842], /* Kansas. USA centered */
//    center: [35.467, -97.516], /*Oklahoma centered */
//  layers: [mapquestOSM, salesTerritory, markerClusters, highlight],
  layers: [terrainMap],
  zoomControl: false,
  attributionControl: false
});


/* Layer control listeners that allow for a single markerClusters layer */
/*
map.on("overlayadd", function(e) {
  if (e.layer === customerLayer) {
    markerClusters.addLayer(customer);
  }
  if (e.layer === newCustomerLayer) {
    markerClusters.addLayer(newCustomer);
  }
  if (e.layer === quotesLayer) {
    markerClusters.addLayer(quotes);
  }
  if (e.layer === serviceFailureLayer) {
    markerClusters.addLayer(serviceFailure);
  }
  if (e.layer === brroPinsLayer) {
    markerClusters.addLayer(brroPins);
  }
});

map.on("overlayremove", function(e) {
  if (e.layer === customerLayer) {
    markerClusters.removeLayer(customer);
  }
  if (e.layer === newCustomerLayer) {
    markerClusters.removeLayer(newCustomer);
  }
  if (e.layer === quotesLayer) {
    markerClusters.removeLayer(quotes);
  }
  if (e.layer === serviceFailureLayer) {
    markerClusters.removeLayer(serviceFailure);
    }
  if (e.layer === brroPinsLayer) {
    markerClusters.removeLayer(brroPins);
  }
});
*/

/* Clear feature highlight when map is clicked */
/*
map.on("click", function(e) {
  highlight.clearLayers();
});
*/

/* Attribution control */
function updateAttribution(e) {
  $.each(map._layers, function(index, layer) {
    if (layer.getAttribution) {
      $("#attribution").html((layer.getAttribution()));
    }
  });
}
map.on("layeradd", updateAttribution);
map.on("layerremove", updateAttribution);

var attributionControl = L.control({
  position: "bottomright"
});
attributionControl.onAdd = function (map) {
  var div = L.DomUtil.create("div", "leaflet-control-attribution");
  div.innerHTML = "<span class='hidden-xs'>Developed by <a href='http://www.nusspro.com/'>Nuss Professional Services</a> | </span><a href='#' onclick='$(\"#attributionModal\").modal(\"show\"); return false;'>Attribution</a>";
  return div;
};
map.addControl(attributionControl);

var zoomControl = L.control.zoom({
  position: "bottomright"
}).addTo(map);

/* GPS enabled geolocation control set to follow the user's location */
var locateControl = L.control.locate({
  position: "bottomright",
  drawCircle: true,
  follow: true,
  setView: true,
  keepCurrentZoomLevel: true,
  markerStyle: {
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8
  },
  circleStyle: {
    weight: 1,
    clickable: false
  },
  icon: "icon-direction",
  metric: false,
  strings: {
    title: "My location",
    popup: "You are within {distance} {unit} from this point",
    outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
  },
  locateOptions: {
    maxZoom: 18,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  }
}).addTo(map);

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 800) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

var baseLayers = {
  "Gray Base Map": mapquestOSM,
  "Aerial Imagery": mapquestOAM,
//  "Imagery with Streets": mapquestHYB,
//  "Topography": topographicalMap,
  "Terrain": terrainMap
};

var groupedOverlays;
groupedOverlays = {
    "Points of Interest": {
     //   "<img src='assets/img/CAP_Icon_dark.png' width='20' height='22'>&nbsp;CAP Customers": customerLayer,
     //   "<span class='glyphicon glyphicon-flag'></span>&nbsp;New Customers": newCustomerLayer,
     //   "<span class='glyphicon glyphicon-comment'></span>&nbsp;Quotes Pending": quotesLayer,
     //   "<span class='glyphicon glyphicon-exclamation-sign'></span>&nbsp;Service Failures": serviceFailureLayer,
     //   "<span class='glyphicon glyphicon-map-marker'></span>&nbsp;BRRO Pins": brroPinsLayer
     //   "<i class='fa fa-warning'></i>&nbsp;Service Failures": serviceFailureLayer
    },
    "Reference": {
     //   "Sales Territories": salesTerritory,
     //   "All Citadel Routes": citadelRoutes,
        "Colorado Oil Permits": expenseQuoted,
        "Precipitation": precipitation
     //   "Temperature": temperature
    }
};

var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, {
  collapsed: isCollapsed
}).addTo(map);

/* Highlight search box text on click */
$("#searchbox").click(function () {
  $(this).select();
});

/* Typeahead search functionality */
$(document).one("ajaxStop", function () {
  $("#loading").hide();
  /* Fit map to salesTerritory bounds */
  map.fitBounds(salesTerritory.getBounds());
  featureList = new List("features", {valueNames: ["feature-name"]});
  featureList.sort("feature-name", {order:"asc"});

  var salesTerritoryBH = new Bloodhound({
    name: "salesTerritory",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: salesSearch,
    limit: 10
  });

  var customerBH = new Bloodhound({
    name: "customer",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: customerSearch,
    limit: 10
  });

  var newCustomerBH = new Bloodhound({
    name: "newCustomer",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: newCustomerSearch,
    limit: 10
  });

  var quotesBH = new Bloodhound({
     name: "Quotes",
     datumTokenizer: function (d) {
       return Bloodhound.tokenizers.whitespace(d.name);
     },
     queryTokenizer: Bloodhound.tokenizers.whitespace,
     local: quoteSearch,
     limit: 10
  });

  var serviceFailureBH = new Bloodhound({
     name: "ServiceFailure",
     datumTokenizer: function (d) {
       return Bloodhound.tokenizers.whitespace(d.name);
     },
       queryTokenizer: Bloodhound.tokenizers.whitespace,
       local: serviceFailureSearch,
       limit: 10
    });

  var geonamesBH = new Bloodhound({
    name: "GeoNames",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: "http://api.geonames.org/searchJSON?username=bootleaf&featureClass=P&maxRows=5&countryCode=US&name_startsWith=%QUERY",
      filter: function (data) {
        return $.map(data.geonames, function (result) {
          return {
            name: result.name + ", " + result.adminCode1,
            lat: result.lat,
            lng: result.lng,
            source: "GeoNames"
          };
        });
      },
      ajax: {
        beforeSend: function (jqXhr, settings) {
          settings.url += "&east=" + map.getBounds().getEast() + "&west=" + map.getBounds().getWest() + "&north=" + map.getBounds().getNorth() + "&south=" + map.getBounds().getSouth();
          $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
        },
        complete: function (jqXHR, status) {
          $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
        }
      }
    },
    limit: 10
  });
  salesTerritoryBH.initialize();
  customerBH.initialize();
  newCustomerBH.initialize();
  quotesBH.initialize();
  serviceFailureBH.initialize();
  geonamesBH.initialize();

  /* instantiate the typeahead UI */
  $("#searchbox").typeahead({
    minLength: 3,
    highlight: true,
    hint: false
  }, {
    name: "salesTerritory",
    displayKey: "name",
    source: salesTerritoryBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>Sales Person ID</h4>"
    }
  }, {
    name: "customer",
    displayKey: "name",
    source: customerBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/CAP_Icon_dark.png' width='20' height='20'>&nbsp;CAP Customers</h4>"
//      suggestion: Handlebars.compile(["{{description}}<br>&nbsp;<small>{{ph_street1}}</small>"].join(""))
    }
  }, {
    name: "newCustomer",
    displayKey: "name",
    source: newCustomerBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><span class='glyphicon glyphicon-flag'></span>&nbsp;New Customers</h4>",
//      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "Quote",
    displayKey: "name",
    source: quotesBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><span class='glyphicon glyphicon-comment'>&nbsp;Quotes Pending</h4>",
//      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "ServiceFailure",
    displayKey: "name",
    source: serviceFailureBH.ttAdapter(),
    templates: {
       header: "<h4 class='typeahead-header'><span class='glyphicon glyphicon-exclamation-sign'></span>&nbsp;Service Failures</h4>",
//      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "GeoNames",
    displayKey: "name",
    source: geonamesBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/globe.png' width='25' height='25'>&nbsp;GeoNames</h4>"
    }
  }).on("typeahead:selected", function (obj, datum) {
    if (datum.source === "salesTerritory") {
      map.fitBounds(datum.bounds);
    }
    if (datum.source === "customer") {
      if (!map.hasLayer(customerLayer)) {
        map.addLayer(customerLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "newCustomer") {
      if (!map.hasLayer(newCustomerLayer)) {
        map.addLayer(newCustomerLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Quotes") {
      if (!map.hasLayer(quotesLayer)) {
        map.addLayer(quotesLayer);
      }
          map.setView([datum.lat, datum.lng], 17);
    if (map._layers[datum.id]) {
          map._layers[datum.id].fire("click");
       }
    }
    if (datum.source === "GeoNames") {
      map.setView([datum.lat, datum.lng], 14);
    }
    if ($(".navbar-collapse").height() > 50) {
      $(".navbar-collapse").collapse("hide");
    }
  }).on("typeahead:opened", function () {
    $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
    $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
  }).on("typeahead:closed", function () {
    $(".navbar-collapse.in").css("max-height", "");
    $(".navbar-collapse.in").css("height", "");
  });
  $(".twitter-typeahead").css("position", "static");
  $(".twitter-typeahead").css("display", "block");
});
