var project = {};
var objs= new obje
project.init=function(){

	//获取公告
	this.getAD()
}
project.getAD = function () {
	$.ajax({
		url:"/Home/art/getNotice",
		type:"get",
		data:{
			offset:5,
			type:'gg'
		},
		success:function(req){
			var txt = '';
			for(var i=0;i<req.data.length;i++){
				txt +='<li class="recent-activity-item" data-recent-activity-action="article_created"><a class="recent-activity-item-parent" href="/home/single/details?status=1&type=gg&uid='+req.data[i].article_id+'&st=1">最新公告</a>'+
						'<a class="recent-activity-item-link" href="/home/single/details?status=1&type=gg&uid='+req.data[i].article_id+'&st=1">'+req.data[i].title+'</a>'+
					'<div class="recent-activity-item-meta">'+
						'<div class="recent-activity-item-time">文章创建于 '+req.data[i].simple_time+'前</div>'+
						// '<div class="recent-activity-item-comment"><span>0</span></div>'+
					'</div>'+
					'</li>'
			}
			$('.recent-activity-list').append(txt)
		}
	})
}

project.init();
