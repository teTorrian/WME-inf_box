
var source = "http://wme.lehre.imld.de:8080/wme_13-14/api/";
var user = 2;
var useritems = new Array();



$(document).ready(function() {
		
	getUser(user);
	getUserItems(user);
	
	
	$( "table th .fa-sort-asc" ).click(function() {
		
		var table = $( this ).closest('table');
		var columnIndex = table.find('th').index($( this ).parent());
		
		if (columnIndex == 0)
			sortItemsByAttribute('name', bubbleSorter, true);
		else if (columnIndex == 1)
			sortItemsByAttribute('size', bubbleSorter, true);
	});
	
	$( "table th .fa-sort-desc" ).click(function() {
		
		var table = $( this ).closest('table');
		var columnIndex = table.find('th').index($( this ).parent());
		
		if (columnIndex == 0)
			sortItemsByAttribute('name', bubbleSorter, false);
		else if (columnIndex == 1)
			sortItemsByAttribute('size', bubbleSorter, false);
	});
});

function getUser(userid) {
	var userSource = source + "users/" + userid;

	jQuery.getJSON(userSource, function(data) {
		
		$(".show-username").append(data.username);
		$("#show-usermail").append(data.email_address);
		$("#show-quota").append(convertDataSize(data.quota) + " / " + convertDataSize(data.quota_used));
		
	});
	
}

function getUserItems(userid) {
	var itemSource = source + "users/" + userid + "/items";
	
	jQuery.getJSON(itemSource, function(data) {
		$.each( data, function( key, val ) {
			var item = new Object();
			item.id = val.id;
			item.filename = val.filename;
			item.file_url = val.file_url;
			useritems.push(item);
			
			$( "#file_table").append( "<tr class='entry-" + val.id + "'><td><a href='" + val.file_url + "' target='_blank'><img id='img-of-" + val.id + "' src='http://wme.lehre.imld.de:8080/wme_13-14/api/items/" + val.id + "/thumbnail'></a>" + val.filename + "</td><td id='size-of-" + val.id + "' class='sizeColumn'></td><td id='type-of-" + val.id + "' class='typeColumn'></td><td id='date-of-" + val.id + "' class='creationColumn'></td><td class='textline'><a href='#'><i class='fa fa-eye fa-lg'></i></a><a href='#'><i class='fa fa-share fa-lg'></i></a><p>|</p><a href='#'><i class='fa fa-pencil fa-lg'></i></a><a href='#'><i class='fa fa-lock fa-lg'></i></a><a href='#'><i class='fa  fa-trash-o fa-lg'></i></a></td></tr>" );						
			
			getItemMeta(item);
		});
	});
}

function getItemMeta(item) {
	var metadataSource = source + "items/" + item.id + "/metadata";
	
	jQuery.getJSON(metadataSource, function(data) {
		var date = new Date(data.creation_date);
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		var hour = date.getHours();
		var minute = date.getMinutes();
	
		item.size = data.size;
		item.creation_date = (day<10 ? '0' : '') + day + '.' + (month<10 ? '0' : '') + month + '.' + year + ' ' + (hour<10 ? '0' : '') + hour + ':' + (minute<10 ? '0' : '') + minute;
		
		if (data.mimetype == 'image/jpeg')
			item.type = 'Bild';
		else if (data.mimetype == 'txt/plain')
			item.type = 'Text';
		
		if(data.thumbnail_available == false){
			$("#img-of-" + item.id).attr('style', 'display:none');
		}
		
		$("#size-of-" + item.id).append(convertDataSize(item.size));
		$("#type-of-" + item.id).append(item.type);
		$("#date-of-" + item.id).append(item.creation_date);
		
	});
}

function convertDataSize(byteSize) {
	var size = byteSize;
	var unit = 'Byte';
	
	
	if (size > 1024)
	{
		size /= 1024;
		unit = 'KB';
		
		if (size > 1024)
		{
			size /= 1024;
			unit = 'MB';
			
			if (size > 1024)
			{
				size /= 1024;
				unit = 'GB';
			}
		}
	} 
	return size.toFixed(0) + ' ' + unit;
}

function sortItemsByAttribute(sortAttribute, sortAlgorithmCallback, ascending)
{
	var sortedData = new Array()
	
	if (sortAttribute == 'name')
		sortAlgorithmCallback(useritems, itemEqualByName);
	else if (sortAttribute == 'size')
		sortAlgorithmCallback(useritems, itemEqualBySize);
		
	if (!ascending)
		useritems.reverse();
		
	resetTable();
}

function resetTable() {
	$( "#file_table tr").remove();

	$.each( useritems, function( key, item ) {
		var size = convertDataSize(item.size);
	
		$("#file_table").append( "<tr class='entry-" + item.id + "'><td><a href='" + item.file_url + "' target='_blank'><img id='img-of-" + item.id + "' src='http://wme.lehre.imld.de:8080/wme_13-14/api/items/" + item.id + "/thumbnail'></a>" + item.filename + "</td><td id='size-of-" + item.id + "' class='sizeColumn'>" + size + "</td><td id='type-of-" + item.id + "' class='typeColumn'>" + item.type + "</td><td id='date-of-" + item.id + "' class='creationColumn'>" + item.creation_date + "</td><td class='textline'><a href='#'><i class='fa fa-eye fa-lg'></i></a><a href='#'><i class='fa fa-share fa-lg'></i></a><p>|</p><a href='#'><i class='fa fa-pencil fa-lg'></i></a><a href='#'><i class='fa fa-lock fa-lg'></i></a><a href='#'><i class='fa  fa-trash-o fa-lg'></i></a></td></tr>" );
	});
}

function bubbleSorter(sortedItems, itemEqualCallback)
{
	var length = sortedItems.length;
	for (var i = 0; i < length; i++)
	{
		var currentLowest = sortedItems[length - 1];
		for (var j = length - 2; j >= i; j--)
		{
			if (itemEqualCallback(sortedItems[j], currentLowest) >= 0)
				currentLowest = sortedItems[j];
		}
		sortedItems.splice( $.inArray(currentLowest, sortedItems), 1 );
		sortedItems.splice(i, 0, currentLowest);
	}
}

function itemEqualByName(firstItem, secondItem)
{
	if (secondItem.filename == firstItem.filename)
		return 0;
	else if (secondItem.filename > firstItem.filename)
		return 1;
	else
		return -1;
}

function itemEqualBySize(firstItem, secondItem)
{
	if (secondItem.size == firstItem.size)
		return 0;
	else if (secondItem.size > firstItem.size)
		return 1;
	else
		return -1;
}

