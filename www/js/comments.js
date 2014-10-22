/* comments - Cordova1 */

var genComments = function (data) {
	var select = document.getElementById ("antennas");
	if (!select) {
		var body = document.getElementsByTagName ("body")[0];
		select = document.createElement ("select");
		body.appendChild (select);
	}
	for (var entry in data.result.records) {
		var option = document.createElement ("option");
		option.value = "i" + (entry + 1);
		var text = document.createTextNode ("Antena #" + data.result.records[entry]._id);
		option.appendChild (text);
		select.appendChild (option);
	}
}
$.ajax ({
	url: "http://datapoa.com.br/api/action/datastore_search",
	data: { 
		resource_id: "f1e9a6cb-6ff3-4a51-bece-a42190bef350",
		limit: 9999		
	},
	dataType: "jsonp",
	success: genComments
});