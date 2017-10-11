$(document).ready(function(){
	$("#search").click(function(){
		var queryString = "";
		$('.row-filter').each(function(){
			var key = this.id;
			var value = this.value;
			if(!queryString) queryString = key + "=" + encodeURIComponent(value);
			else queryString += key + "=" + encodeURIComponent(value);
		});
		console.log(queryString);
		$.get("http://35.199.63.1:8080/providers?" + queryString, function(data) {
			$("#results").html(data);
		});
	})
})
