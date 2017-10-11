var serverEndpoint = "http://35.199.63.1:8080";

$(document).ready(function(){
	$("#search").click(function(){
		var queryString = "";
		$('.row-filter').each(function(){
			if(this.value){
				var block = this.id + "=" + encodeURIComponent(this.value);
				if(!queryString) queryString = block;
				else queryString += "&" + block;
			}
		});
		$('#query-display span').html(queryString);
		
		$.get(serverEndpoint + "/providers?" + queryString, function(data) {
			$("#results").html(""+ data);
		});
	});
	
	$.get(serverEndpoint + "/fields", function(data) {
		data.forEach(function(column){
			$('#column-selector').append('<label class="checkbox-inline column-filter"><input type="checkbox" value="'+column+'">'+column+'</label>');
		});
	});
})
