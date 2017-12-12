var project = {};
var objs= new obje
project.init=function(){
	this.arrs=['','公告中心','帮助中心']
	this.arr1=['新币上线','最新公告','常见问题']
	this.arrs2 =['',['xb','gg'],['cj']]
	this.p1=[1,1];
	this.p1c=[0,0]
	//解析URL并初始化
	this.initData()
}
project.initData=function(){
	var url = objs.getUrl();
	$('.breadcrumbs').append('<li><a href="/Home/single/lists.html?status='+url.status+'">'+project.arrs[url.status]+'</a></li>');
	$('.breadcrumbs').append('<li>'+project.arr1[url.st]+'</li>');
	$.ajax({
		url:'/Home/art/artDetail',
		type:'get',
		data:{
			 aid:url.uid
		},
		success:function(req){
			$('.timer').html(req.article.simple_time);
			$('#hideP').html(req.article.content);
			$('.article-title').html(req.article.title);
			$('.share-facebook').attr('href','https://www.facebook.com/share.php?title='+req.article.title+'&u='+window.location.href)
			$('.share-twitter').attr('href','https://twitter.com/intent/tweet?url='+window.location.href)
			$('.share-googleplus').attr('href','https://plus.google.com/share?hl=zh-cn&url='+window.location.href)
			$('.share-linkedin').attr('href','https://www.linkedin.com/shareArticle?mini=true&amp;source=OPENIEX&title='+req.article.title+'&url='+window.location.href)
			var a = $('#hideP').text();
			$('#article-body').html(a);
			var txt ='';
			for(var i=0;i<req.another_article.length;i++){

				if(req.another_article[i].article_id==url.uid){
					txt+='<li>'+
	                   ' <a href="/home/single/details.html?status='+url.status+'&uid='+req.another_article[i].article_id+' &st='+url.st+'" class="sidenav-item current-article">'+req.another_article[i].title+'</a>'+
	                  '</li>'
	              }else{
	              	txt+='<li>'+
	                   ' <a href="/home/single/details.html?status='+url.status+'&uid='+req.another_article[i].article_id+' &st='+url.st+'" class="sidenav-item ">'+req.another_article[i].title+'</a>'+
	                  '</li>'
	              }
			}
			var text = '';
			for(var j=0;j<req.contact_article.length;j++){
				text += '<li>'+
                      '<a href="/home/single/details.html?status='+url.status+'&uid='+req.contact_article[j].article_id+' &st='+url.st+'">'+req.contact_article[j].title+'</a>'+
                    '</li>'
			}
			$('#ulis').append(txt);
			$('#uli2').append(text);
		}
	})
}

project.init();
