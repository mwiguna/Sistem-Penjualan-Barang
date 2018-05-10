
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

	function sendChat(){
		id    = $("h3").attr("data-id");
		nama  = $("h3").attr("data-to");
		me    = $("h3").attr("data-me");
		pesan = $("#pesan").val();
		if(pesan == "") return false;
		isipe = '<div class="col-8 offset-4 chatc chatme"><div class="col-12">'+pesan+'</div><div class="col-12 timm"><i>'+nama+' ~ Pada '+time+'</i></div></div>';
		$.ajax({
			url: '/pesanuser/'+id,
			type: 'POST',
			data: "pesan=" + pesan,
			success: function(){
				$("#pesan").val("");
				$(".chatroom").append(isipe);
				$(".chatroom").animate({
					scrollTop: $(".chatroom").prop("scrollHeight")
				});
			}
		});

		isip  = '<div class="col-8 chatc chatyu"><div class="col-12">'+pesan+'</div><div class="col-12 timm"><i>'+nama+' ~ Pada '+time+'</i></div></div>';
		
		socket.emit('newPesan', isip, id, me);
		socket.emit('perPesan', id, nama, time, me);
		return false;
	}

	//Untuk menampilkan
	socket.on('newPesan', function(pesan, id, idse){
		me   = $("h3").attr("data-me");
		send = $("h3").attr("data-id");
		if(me == id && send == idse){ 
			$(".chatroom").append(pesan);
			$(".chatroom").animate({
				scrollTop: $(".chatroom").prop("scrollHeight")
			});
			$(".alert").trigger('play');
		}
	});