$(document).ready(function() {

	$( "table th .fa-sort-asc" ).click(function() {
		
		var table = $( this ).closest('table');
		var columnIndex = table.find('th').index($( this ).parent());
		
		if (columnIndex == 0)
			sortTableByColumn(table, columnIndex, 'string', bubbleSorter, true);
		else if (columnIndex == 1)
			sortTableByColumn(table, columnIndex, 'value', bubbleSorter, true);
	});
	
	$( "table th .fa-sort-desc" ).click(function() {
		
		var table = $( this ).closest('table');
		var columnIndex = table.find('th').index($( this ).parent());
		
		if (columnIndex == 0)
			sortTableByColumn(table, columnIndex, 'string', bubbleSorter, false);
		else if (columnIndex == 1)
			sortTableByColumn(table, columnIndex, 'value', bubbleSorter, false);
	});
});

function sortTableByColumn(table, columnIndex, dataType, sortAlgorithmCallback, ascending)
{
	var tableLines = table.children('tbody').children('tr');
	var unsortedData = tableLines.children('td:nth-Child(' + (columnIndex + 1) +')');
	
	if (dataType == 'string')
		unsortedData = unsortedData.map(function() {
				return $(this).text().trim();
			}).get();
	else if (dataType == 'value')
		unsortedData = unsortedData.map(function() {
				return parseFloat($(this).text().split(' ')[0]);
			}).get();
	
	var sortedData = new Array;
	for (var i = 0; i < unsortedData.length; i++)
		sortedData.push(unsortedData[i]);
	
	sortAlgorithmCallback(sortedData);
	if (!ascending)
		sortedData.reverse();	
	
	$.each(sortedData, function(key, value) {
		$(table).children('tbody').append($(tableLines).get($.inArray(value, unsortedData)));
	});
}

function bubbleSorter(sorterDataSource)
{
	var length = sorterDataSource.length;
	for (var i = 0; i < length; i++)
	{
		var currentLowest = sorterDataSource[length - 1];
		for (var j = length - 2; j >= i; j--)
		{
			if (sorterDataSource[j] < currentLowest)
				currentLowest = sorterDataSource[j];
		}
		sorterDataSource.splice( $.inArray(currentLowest, sorterDataSource), 1 );
		sorterDataSource.splice(i, 0, currentLowest);
	}
}

