	var socket = io();

	time  = new Date();
	year  = time.getFullYear();
	month = time.getMonth() + 1;
	date  = time.getDate();
	hour  = time.getHours();
	min   = time.getMinutes();
	sec   = time.getSeconds();
		
	if(month < 10) month = "0"+month;
	if(date  < 10) date  = "0"+date;
	if(hour  < 10) hour  = "0"+hour;
	if(min   < 10) min   = "0"+min;
	if(sec   < 10) sec   = "0"+sec;	

	time  = year+"-"+month+"-"+date+" "+hour+":"+min+":"+sec;

	$('form').submit(function(){
		id     = $("h3").attr("data-to");
		name   = $("h3").attr("data-name");
		barang = $("#barang").attr("data-name");
		socket.emit('newBeliAdmin', name, barang, id);
	});

	socket.on('newBeliAdmin', function(name, barang, id){
		me = $("h3").attr("data-me");
		if(me === undefined){ 
			id  = $("#penda a").attr("data-id") * 1 + 1;
			msg = '<div class="col-12 member"><div class="col-7 push-1 listcom">'+name+' Melakukan Pembelian '+barang+'<div class="col-12 timm">Pada : '+time+'</div></div><a href="/notajualuser/'+id+'" data-id="'+id+'" class="col-3 fol">Lihat Detail &raquo;</a></div>';
			$('#penda').prepend(msg);
			total = $(".totbarr").text() * 1 + 1;
			$(".totbarr").text(total);
		}
	});