
var socket = io();
me = $("h3").attr("data-me");
if(me != undefined) url = '/bcbeli';
else url = '/bcbeliadmin'

$.ajax({
	method: 'GET',
	url: url,
	success: function(ir){
		ir = ir * 1;
		if(ir != 0) $(".bcbeli").css({opacity: '1'}).text(ir);
	}
});

socket.on('newBeli', function(nama, barang, id){
	me = $("h3").attr("data-me");
	if(me == id || me === undefined){ 
		ir = $(".bcbeli").text() * 1 + 1;
		$(".bcbeli").css({opacity: '1'}).text(ir);
		$(".alert").trigger('play');
	}
});

socket.on('newBeliAdmin', function(nama, barang, id){
	me = $("h3").attr("data-me");
	if(me === undefined){ 
		ir = $(".bcbeli").text() * 1 + 1;
		$(".bcbeli").css({opacity: '1'}).text(ir);
		$(".alert").trigger('play');
	}
});