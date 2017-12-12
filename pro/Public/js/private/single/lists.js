var project = {};
var objs= new obje
project.init=function(){
	this.arrs=['',['公告中心','新币上线','最新公告'],['帮助中心','']]
	this.arrs2 =['',['xb','gg'],['cj']]
	this.p1=[1,1];
	this.p1c=[0,0]
	//解析URL并初始化
	this.initData()
}
project.initData=function(){
	var url = objs.getUrl();
	$('.breadcrumbs').append('<li>'+project.arrs[url.status][0]+'</li>');
	$('.page-header h1').html(project.arrs[url.status][0]);
	$('.section-tree-title').eq(0).html(project.arrs[url.status][1]);
	$('.section-tree-title').eq(1).html(project.arrs[url.status][2]);
	if(url.status==2){
		$('.section').eq(1).remove();
	}else if(url.status==1){
		$.ajax({
			url:'/Home/art/getNotice',
			type:'get',
			data:{
				p:project.p1[1],
				type:project.arrs2[url.status][1],
				offset:6
			},
			success:function(req){
				var txt = '';
				for(var j=0;j<req.data.length;j++){
					txt ='<li class="article-list-item">'+                    
                    '<a href="/home/single/details.html?status='+url.status+'&uid='+req.data[j].article_id+' &st=1" class="article-list-link">'+req.data[j].title+'</a>'+
                 	 '</li>';
                 	$('.article-list').eq(1).append(txt)
				}
				project.p1[1]++;
				project.p1c[1]=req.count;
				$('.see-all-articles').eq(1).html('查看所有 '+req.count+' 篇文章');
				$('.see-all-articles').attr('data-id',1)
				if(req.count<=6){
					$('.see-all-articles').eq(1).css('display','none')
				}
			}
		})
	}
	$.ajax({
			url:'/Home/art/getNotice',
			type:'get',
			data:{
				p:project.p1[0],
				type:project.arrs2[url.status][0],
				offset:6
			},
			success:function(req){
				var txt = '';
				for(var j=0;j<req.data.length;j++){
					txt ='<li class="article-list-item">'+                    
                    '<a href="/home/single/details.html?status='+url.status+'&uid='+req.data[j].article_id+'&st=0" class="article-list-link">'+req.data[j].title+'</a>'+
                 	 '</li>';
                 	$('.article-list').eq(0).append(txt)
				}
				project.p1[0]++;
				project.p1c[0]=req.count;
				$('.see-all-articles').eq(0).html('查看所有 '+req.count+' 篇文章');
				$('.see-all-articles').attr('data-id',0)
				if(req.count<=6){
					$('.see-all-articles').eq(0).css('display','none')
				}
			}
		})
	//单击加载
	$('.see-all-articles').on('click',function(){
		var uids=$(this).attr('data-id');
		$.ajax({
			url:'/Home/art/getNotice',
			type:'get',
			data:{
				p:project.p1[uids],
				type:project.arrs2[url.status][uids],
				offset:6
			},
			success:function(req){
				var txt = '';
				for(var j=0;j<req.data.length;j++){
					txt ='<li class="article-list-item">'+                    
                    '<a href="/home/single/details.html?status='+url.status+'&uid='+req.data[j].article_id+'&st='+uids+'" class="article-list-link">'+req.data[j].title+'</a>'+
                 	 '</li>';
                 	$('.article-list').eq(uids).append(txt)
				}
				project.p1[uids]++;
				project.p1c[uids]=req.count;
				if(req.count<=(project.p1[uids]-1)*6){
					$('.see-all-articles').eq(uids).css('display','none')
				}
			}
		})
	})
}

project.init();
