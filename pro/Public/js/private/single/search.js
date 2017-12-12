var project = {};
var objs= new obje
project.init=function(){

	//搜索
	this.initData()
}

project.initData = function(){
	var url = objs.getUrl();
	var query = url.query;
	$('#query').val(decodeURI(url.query))
	$.ajax({
		url:'/Home/art/getNotice',
		type:'get',
		data:{
			keyword:decodeURI(url.query)
		},
		success:function(req){
			if(req.count==0){
				$('.page-header').append('<p class="page-header-description">“'+decodeURI(url.query)+'”没有结果</p>')
			}else{
				$('.page-header').append('<p class="page-header-description">“'+decodeURI(url.query)+'”的结果：'+req.count+' 条</p>');
				var txtx ='<div class="search-results">'+
				'<section class="search-results-column">'+
				'<h3 class="search-results-subheading">'+
				' 知识库'+
				'</h3>'+
				'<ul class="search-results-list" id="utexr"></ul>'
				'</section>'+
				'</div>';
				$('.page-header').parent().append(txtx);
				var pt=''
				for(var i=0;i<req.data.length;i++){
					var status='';
					var st='';
					if(req.data[i].position_id==6){
						status=2;
						st=2
					}else{
						status=1
						if(req.data.length==103){
							st=1
						}else{
							st=0
						}
					}
					pt+='<li class="search-result">'+
					'<a href="/home/single/details?status='+status+'&uid='+req.data[i].article_id+'&st='+st+'" class="search-result-link">'+req.data[i].title+'</a>'+

					'<span class="search-result-votes meta-count">0</span>'+

					'<ul class="meta-group">'+
			
					'  <li class="meta-data">'+

					'  OPENIEX'+

					' </li>'+
					' <li class="meta-data"><time>'+req.data[i].simple_time+'前</time></li>'+
					' </ul>'+
					'  <div class="search-result-description">'+req.data[i].atter+'</div>'+
					'  </li>'
				}
				$('#utexr').append(pt)
			}
		}
	})
}

project.init();
