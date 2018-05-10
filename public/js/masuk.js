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
		name =  $("#nama").val();
		socket.emit('newBarang', name);
	});

	//Untuk menampilkan
	socket.on('newBarang', function(name){
		id  = $("#hima a").attr("data-id") * 1 + 1;
		tot = $(".ttma").text() * 1 + 1;
		msg = '<a href="editbarang/admin/'+id+'" class="col-12 member" data-id="'+id+'">Distributor menambahkan <i>'+name+'</i><div class="col-12 timm">Pada : '+time+'</div></a>';
		$('#hima').prepend(msg);
		$(".ttma").text(tot);
		$(".alert").trigger('play');
	});