
var socket = io();

$.ajax({
	method: 'GET',
	url: '/bcpesan',
	success: function(ir){
		ir = ir * 1;
		if(ir != 0) $(".bcpesan").css({opacity: '1'}).text(ir);
	}
});

socket.on('newPesan', function(pesan, id){
	me = $("h3").attr("data-me");
	if(me == id){ 
		ir = $(".bcpesan").text() * 1 + 1;
		$(".bcpesan").css({opacity: '1'}).text(ir);
		$(".alert").trigger('play');
	}
});