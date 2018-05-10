
var socket = io();

$.ajax({
	method: 'GET',
	url: '/bcbeliadmin',
	success: function(ir){
		ir = ir * 1;
		if(ir != 0) $(".bcbeli").css({opacity: '1'}).text(ir);
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