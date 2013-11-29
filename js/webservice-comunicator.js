
var source = "http://wme.lehre.imld.de:8080/wme_13-14/api/";
var user = 1;
var useritems = new Array();



$(document).ready(function() {

	/*$.ajaxSetup( { "async": false } );*/
		
	getUser(user);
	getUserItems(user);
	
	
	/*$.ajaxSetup( { "async": true } );*/
});
	
	

function getUser(userid) {
	var userSource = source + "users/" + userid;
	var divisor = 1024 * 1024;

	jQuery.getJSON(userSource, function(data) {
		
		$(".show-username").append(data.username);
		$("#show-usermail").append(data.email_address);
		$("#show-quota").append(data.quota / divisor + " GB / " + (data.quota_used / divisor).toFixed(2) + " GB");
		
	});
	
}



function getUserItems(userid) {
	var itemSource = source + "users/" + userid + "/items";
	var i = 0;
	
	jQuery.getJSON(itemSource, function(data) {
		$.each( data, function( key, val ) {
			useritems[i] = val.id;
			
			$( "#file_table").append( "<tr class='entry-" + val.id + "'><td><img src='" + val.file_url + "'>" + val.filename + "</td><td id='size-of-" + val.id + "' class='sizeColumn'></td><td id='type-of-" + val.id + "' class='typeColumn'></td><td id='date-of-" + val.id + "' class='creationColumn'></td><td class='textline'><a href='#'><i class='fa fa-eye fa-lg'></i></a><a href='#'><i class='fa fa-share fa-lg'></i></a><p>|</p><a href='#'><i class='fa fa-pencil fa-lg'></i></a><a href='#'><i class='fa fa-lock fa-lg'></i></a><a href='#'><i class='fa  fa-trash-o fa-lg'></i></a></td></tr>" );						

			i++;
		});
		insertItemMeta();
	});

}



function insertItemMeta() {

	for(i = 0; i < useritems.length; i++) {
	
		getItemMeta(useritems[i]);
	
	}

}



function getItemMeta(itemid) {

	
	var metadataSource = source + "items/" + itemid + "/metadata";
	var sizeIdName = "#size-of-" + itemid;
	
	jQuery.getJSON(metadataSource, function(data) {
		
		$("#size-of-" + itemid).append(data.size);
		$("#type-of-" + itemid).append(data.mimetype);
		$("#date-of-" + itemid).append(data.creation_date);
		
	});
	
}



function printItemIdArray() {
	
	$("body").append("printItemIdArray war hier! useritems.length: " + useritems.length + "<br>");
	
	for(i = 0; i < useritems.length; i++) {
		$("body").append("I[" + i + "]: " + useritems[i] + "<br></br>");
	}
}
