layui.use(['element','jquery'],function(){
	var elenemt = layui.element;
  var $ = layui.$;

  $("#Mindex").click(function(){
    $(".iframe").attr('src','/index/Mindex');
  })
  
  $("#user").click(function(){
    $(".iframe").attr('src','/index/manager');
	})

	$("#article").click(function(){
	 	$(".iframe").attr('src','/index/article');
  })
  $("#type").click(function(){
    $(".iframe").attr('src','/index/type');
  })

  $("#comment").click(function(){
    $(".iframe").attr('src','/index/comment');
  })

});