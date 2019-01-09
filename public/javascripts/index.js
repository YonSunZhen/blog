layui.use(['element','jquery'],function(){
	var elenemt = layui.element;
  var $ = layui.$;

  $("#Mindex").click(function(){
    console.log("000");
    $(".iframe").attr('src','/index/Mindex');
  })
  
  $("#user").click(function(){
    $(".iframe").attr('src','/index/manager');
	})

	$("#addArticle").click(function(){
	 	$(".iframe").attr('src','/index/addArticle');
  })
  // $("#type").click(function(){
  //   $(".iframe").attr('src','/index/type');
  // })

  $("#comment").click(function(){
    $(".iframe").attr('src','/index/comment');
  })

});