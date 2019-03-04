layui.use(['element','jquery'],function(){
	var elenemt = layui.element;
  var $ = layui.$;

  $("#Mindex").click(function(){
    console.log("000");
    $(".iframe").attr('src','/index/Mindex');
  })
  
  $("#manager").click(function(){
    $(".iframe").attr('src','/index/manager');
	})
  $("#user").click(function(){
    $(".iframe").attr('src','/index/user');
	})

	$("#addArticle").click(function(){
	 	$(".iframe").attr('src','/index/addArticle');
  })

	$("#manageArticle").click(function(){
	 	$(".iframe").attr('src','/index/manageArticle');
  })
  // $("#type").click(function(){
  //   $(".iframe").attr('src','/index/type');
  // })

  $("#comment").click(function(){
    $(".iframe").attr('src','/index/comment');
  })

});