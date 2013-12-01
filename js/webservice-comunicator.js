
var source = "http://wme.lehre.imld.de:8080/wme_13-14/api/";
var user = 2;



$(document).ready(function() {
		
	getUser(user);
	getUserItems(user);
	
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
		
		
			$( "#file_table").append( "<tr class='entry-" + val.id + "'><td><a href='" + val.file_url + "' target='_blank'><img id='img-of-" + val.id + "' src='http://wme.lehre.imld.de:8080/wme_13-14/api/items/" + val.id + "/thumbnail'></a>" + val.filename + "</td><td id='size-of-" + val.id + "' class='sizeColumn'></td><td id='type-of-" + val.id + "' class='typeColumn'></td><td id='date-of-" + val.id + "' class='creationColumn'></td><td class='textline'><a href='#'><i class='fa fa-eye fa-lg'></i></a><a href='#'><i class='fa fa-share fa-lg'></i></a><p>|</p><a href='#'><i class='fa fa-pencil fa-lg'></i></a><a href='#'><i class='fa fa-lock fa-lg'></i></a><a href='#'><i class='fa  fa-trash-o fa-lg'></i></a></td></tr>" );						
			
			getItemMeta(val.id);
			
		});
		
	});

}




function getItemMeta(itemid) {

	
	var metadataSource = source + "items/" + itemid + "/metadata";
	
	jQuery.getJSON(metadataSource, function(data) {
		
		if(data.thumbnail_available == false){
			$("#img-of-" + itemid).attr('style', 'display:none');
		}
		
		$("#size-of-" + itemid).append((data.size / 1024).toFixed(2) + " MB");
		$("#type-of-" + itemid).append(data.mimetype);
		$("#date-of-" + itemid).append(data.creation_date);
		
	});
	
}


