layui.use(['element','jquery'],function(){
	var elenemt = layui.element;
    var $ = layui.$;

    $("#Mindex").click(function(){
		$(".iframe").attr('src','Mindex.html');
	})
	$("#MDelComment").click(function(){
	 	$(".iframe").attr('src','MDelComment.html');
	})
	$("#MDelPicture").click(function(){
	 	$(".iframe").attr('src',"MDelPicture.html");
    })
	$("#MDelUser").click(function(){
	 	$(".iframe").attr('src',"MDelUser.html");
    })
});