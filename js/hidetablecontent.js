$(document).ready(function() {

	$( "#hideSize" ).click(function(e) {
		toggleTableColumn('.sizeColumn');
		$( this ).toggleClass('active');
		
	});
	
	$( "#hideType" ).click(function() {
		toggleTableColumn('.typeColumn');
		$( this ).toggleClass('active');
	});
	
	$( "#hideCreation" ).click(function() {
		toggleTableColumn('.creationColumn');
		$( this ).toggleClass('active');
	});
});

function toggleTableColumn(columnclass)
{
	$( columnclass ).toggle();
}

