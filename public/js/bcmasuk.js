
var socket = io();

$.ajax({
	method: 'GET',
	url: '/bcmasuk',
	success: function(ir){
		ir = ir * 1;
		if(ir != 0) $(".bcmasuk").css({opacity: '1'}).text(ir);
	}
});

socket.on('newBarang', function(name){
	ir  = $(".bcmasuk").text() * 1 + 1;
	$(".bcmasuk").css({opacity: '1'}).text(ir);
	$(".alert").trigger('play');
});