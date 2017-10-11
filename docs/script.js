var serverEndpoint = "http://35.199.63.1:8080";

var pageNum = 0;
function search(){
	var queryString = "";
	// Adding row filters
	$('.row-filter').each(function(){
		if(this.value){
			var block = this.id + "=" + encodeURIComponent(this.value);
			if(!queryString) queryString = block;
			else queryString += "&" + block;
		}
	});
	$('#query-display span').html(queryString);
	
	// Adding column filters
	$('.column-filter').each(function(){
		if(this.checked){
			var block = encodeURIComponent(this.value);
			if(!queryString) queryString = block;
			else queryString += "&" + block;
		}
	});
	
	// Adding page number
	queryString += "&pageNum=" + pageNum;
	
	$("#results").html("");
	$.get(serverEndpoint + "/providers?" + queryString, function(data) {
		if(data.length > 0){
			var columns = Object.keys(data[0]);
			columns.sort();
			var display = "<thead><tr>";
			
			columns.forEach(function(column){
				display += "<th>"+column+"</th>";
			});
			display += "</tr></thead><tbody>";
			
			data.forEach(function(row){
				display += "<tr>";
				columns.forEach(function(column){
					display += "<td>"+row[column]+"</td>";
				});
				display += "</tr>";
			});
			display += "</tbody>";
			
			$("#results").html(display);
		}
		else{
			$("#results").html("");
		}
	});
}

$(document).ready(function(){
	$("#search").click(function(){
		pageNum = 0;
		search();
	});
	
	$("#more").click(function(){
		pageNum++;
		search();
	});
	
	$.get(serverEndpoint + "/fields", function(data) {
		data.forEach(function(column){
			$('#column-selector').append('<label class="checkbox-inline"><input class="column-filter" type="checkbox" checked value="'+column+'">'+column+'</label>');
		});
	});
})
