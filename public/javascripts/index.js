layui.use(['element','jquery'],function(){
	var elenemt = layui.element;
  var $ = layui.$;

  $("#Mindex").click(function(){
    $(".iframe").attr('src','/index/Mindex');
	})
	$("#test").click(function(){
	 	$(".iframe").attr('src','/index/test');
	})
	$("#MDelPicture").click(function(){
	 	$(".iframe").attr('src',"MDelPicture.html");
  })
	$("#MDelUser").click(function(){
	 	$(".iframe").attr('src',"MDelUser.html");
  })

});