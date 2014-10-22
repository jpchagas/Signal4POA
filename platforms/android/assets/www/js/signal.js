/* signal - Cordova1 */

var initMap = function (data) {
	var content = document.getElementById ("content");
	if (!content) {
		var body = document.getElementsByTagName ("body")[0];
		content = document.createElement ("div");
		content.id = "content";
		body.appendChild (content);
	}
	var mapOptions = {
		center: new google.maps.LatLng (-29.9965035, -51.1868652),
		zoom: 14,
		disableDefaultUI: true, 
		keyboardShortcuts: false,
		/*scrollwheel: false,*/
	};
	var map = new google.maps.Map (content, mapOptions);
	var infoWnds = []; /* list to handle concurrent event calls (on touch input) */ 
	var loadInfo = function (marker, entry) {
		var antennaInfo = new google.maps.InfoWindow ({
			content: "<div id=\"antenna-info\"><ul>" +
				"<li class=\"info-sep-top\">Antena #" + data.result.records[entry]._id + "</li>" +
				"<li>" + data.result.records[entry].EMPRESA_01 + "</li>" +
				"<li>" + data.result.records[entry].EMPRESA_02 + "</li>" +
				"<li>" + data.result.records[entry].EMPRESA_03 + "</li>" +
				"<li>" + data.result.records[entry].EMPRESA_04 + "</li>" +
				"<li class=\"info-sep-middle\">2.5" + "</li>" +
				"<li class=\"info-sep-bottom\"><a href=\"comments.html\">ver comentarios" + "</a></li>" +
				"</ul></div>"		
		});
		google.maps.event.addListener (marker, "click", function () {
			antennaInfo.open (map, marker);
			for (var wnd in infoWnds) {
				infoWnds[wnd].close();
			}
			infoWnds = [];
			infoWnds.push (antennaInfo);
		});
	};
	for (var entry in data.result.records) {
		var antenna = new google.maps.Marker ({
			position: new google.maps.LatLng (
				data.result.records[entry].LATITUDE,
				data.result.records[entry].LONGITUDE),
			map: map,
			title: "Antena " + data.result.records[entry]._id,
			icon: "assets/marker35.png"
		});
		loadInfo (antenna, entry);
	}
};
$.ajax ({
	url: "http://datapoa.com.br/api/action/datastore_search",
	data: { 
		resource_id: "f1e9a6cb-6ff3-4a51-bece-a42190bef350",
		limit: 9999		
	},
	dataType: "jsonp",
	success: initMap
});
