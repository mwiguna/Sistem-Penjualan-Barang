
$(document).ready(function(){
	
	/*----------------- Member -----------------*/

	$(document).on('click', '.fl', function(){
		link  = $(this).attr('href');
		id    = link.substr(8);
		idu   = $("h3").attr('data-me');
		$(this).parent().html('<a href="/unfollow/'+id+'" class="col-2 fol uf" onclick="return false">Unfollow</a>');
		follow(id, idu);	
	});
	$(document).on('click', '.uf', function(){
		link = $(this).attr('href');
		id   = link.substr(10);
		$(this).parent().html('<a href="/follow/'+id+'" class="col-2 fol fl" onclick="return false">Follow</a>');
		unfollow(id);
	});

	if($("h3").attr("data-to") != undefined && $("h3").attr("data-id") != undefined) $(".chatroom").scrollTop($('.chatroom')[0].scrollHeight);

	function follow(id, idu){
		$.ajax({
			method: "GET",
			url: "/follow/"+id+"/"+idu
		});
	}

	function unfollow(id){
		$.ajax({
			method: "GET",
			url: "/unfollow/"+id
		});
	}

	/*----------------- Member -----------------*/

});