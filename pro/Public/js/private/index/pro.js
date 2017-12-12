var project = {};
var objs = new obje()
project.init=function(){
	//初始化参数
	this.record=1 	 //成交记录
	this.CordLengh=0 //成交记录条数
	this.coin = 'BTC'; //币种名称
	this.id = "37"	//币种ID
	this.ago = 'BTC'	//类型
	this.CordLengh=0
	this.m = 1 //买单当前记录
	this.mm=1 //卖单当前记录
	this.mLength = 0; //买单条数
	this.mmLength= 0 ;//卖单条数
//  设置切换效果
this.adNotClick();
//  设置页面高度
this.cheight()
	//切换币种
	this.iconClick()
	//初始化
	this.initData()
	//滚动事件
	this.scrooBot()
	//轮训更新
//	this.setInter()
	//登录用户获取数据
	if($('#hidden').val()==1){
		//我的订单
		this.meOrders()
		//我的成交记录
		this.meCount()
	}
	//获取币种信息
	this.getCoins()
	//买入和fee
	this.buy()
	//卖出和fee
	this.sell()
	//删除订单
	this.delOrder()
	
}
project.delOrder = function () {
	$('#abut3').on('click','.icondel',function(){
		var oid = $(this).attr('data-orid');
		var tthis = $(this);
		$.ajax({
			url:'/Home/trade/cancel',
			type:'get',
			data:{
				order_id:oid
			},
			success:function(req){
				if(req.status==1){
					tthis.parents('ul').remove()
					alert(req.info)
				}
			}
		})
	})
}
project.sell = function(){
	$('.but2').on('click',function(){
		if($('#buypri').val().length<=0 || $('#buynum').val().length<=0){
			alert($('#mess').attr('data-error'))
			return false
		}
		$.ajax({
			url:'/Home/trade/sell',
			type:'post',
			data:{
				sellprice:$('#buypri').val(),
				sellnum:$('#buynum').val(),
				currency_id:project.id
			},
			success:function(req){
				if(req.status==1){
					alert($('#mess').attr('data-ok'))
				}else{
					alert(req.info)
				}
			}
		})
	})
	$('#buypri').on('change',function(){
		$('#buysum').html(objs.fds($('#buypri').val(),$("#buynum").val()))
	})
	$('#buynum').on('change',function(){
		$('#buysum').html(objs.fds($('#buypri').val(),$("#buynum").val()))
	})
}
project.buy = function(){
	$('.but1').on('click',function(){
		if($('#buypri').val().length<=0 || $('#buynum').val().length<=0){
			alert($('#mess').attr('data-error'))
			return false
		}
		$.ajax({
			url:'/Home/trade/buy',
			type:'post',
			data:{
				buyprice:$('#buypri').val(),
				buynum:$('#buynum').val(),
				currency_id:project.id
			},
			success:function(req){
				if(req.status==1){
					alert($('#mess').attr('data-ok'))
				}else{
					alert(req.info)
				}
			}
		})
	})
}
project.getCoins = function() {
	$.ajax({
		url:'/Home/orders/CurrencyInfo',
		type:'post',
		data:{
			p:project.coinCount
		},
		success:function(req){
			var txt = '';
				var txtx='';
			for(var i=0;i<req.data.length;i++){
				txt += '<li>'+req.data[i].currency_mark+'/BTC</li>';
				txtx +='<li>'+
										'<p>'+req.data[i].currency_name+' / USDT (<span>'+req.data[i].latest_price+'</span>)</p>'+
										'<p>24小时交易量：<span>'+req.data[i].one_day_trades+'</span> <span>'+req.data[i].up_or_down+'%</span></p>'+
									'</li>'
			}
			$('.iconSelect>ul').append(txt)
			$('#ucoins').append(txtx)
		}
	})
}
project.meOrders = function () {
	$.ajax({
		url:'/Home/trade/myOrders',
		type:'get',
		data:{
			currency_id:project.id
		},
		success:function(req){
			var txt ='';
			for(var i=0;i<req.data.length;i++){
				txt+='<ul>'+
				'<li>'+req.data[i].add_time+'</li>'+
				'<li>'+req.data[i].price+'</li>'+
				'<li>'+req.data[i].num+'</li>'+
				'<li>'+req.data[i].sum+'</li>'+
				'<li><svg class="icon icondel" aria-hidden="true" data-orid="'+req.data[i].orders_id+'"><use xlink:href="#icon-guanbi"></use></svg></li>'+
				'</ul>'
			}
			$('#abut3>div').eq(0).append(txt);
			$("#abut3").nanoScroller();
		}
	})
}
project.meCount = function () {
	$.ajax({
		url:'/Home/trade/tradeRecords',
		type:'get',
		data:{
			currency_id:project.id,
			sign:'my'
		},
		success:function(req){
			var txt='';
			for(var i=0;i<req.data.length;i++){
				txt+='<ul>'+
				'<li>'+req.data[i].add_time+'</li>'+
				'<li>'+req.data[i].price+'</li>'+
				'<li>'+req.data[i].num+'</li>'+
				'<li>'+req.data[i].money+'</li>'+
				'</ul>'
			}
			$('#abut4>div').eq(0).append(txt);
			$('#abut4').nanoScroller()
		}
	})
}
project.setInter = function() {
	setInterval(function(){
		//成交记录
		$.ajax({
			url:'/Home/trade/tradeRecords',
			dataType:'json',
			type:'get',
			data:{
				currency_id:project.id,
				p:0
			},
			success:function(req){
				if(req.count==0){
					return false
				}
				if(req.count>project.CordLengh){
					var txt =""
					for(var i=0;i<req.count-project.CordLengh;i++){
						txt += '<ul>'+
						'<li>'+req.data[i].add_time+'</li>'+
						'<li>'+req.data[i].price+'</li>'+
						'<li>'+req.data[i].num+'</li>'+
						'<li>'+req.data[i].money+'</li>'+
						'</ul>';
					}
					$('#abut5>div').eq(0).prepend(txt);
					project.CordLengh=req.count;
					$('#abut5').nanoScroller()
				}
			}
		})
		//买单
		$.ajax({
			url:"/Home/trade/orderRecords",
			type:'get',
			dataType:'json',
			data:{
				currency_id:project.id,
				type:'buy',
				p:0
			},
			success:function(req){
				if(req.count==0){
					return false
				}
				if(req.count>project.mLength){
					var txt = "";
					for(var i=0;i<req.count-project.mLength;i++){
						txt +='<ul>'+
						'<li>'+req.data[i].total+'</li>'+
						'<li>'+req.data[i].num+'</li>'+
						'<li>'+req.data[i].price+'</li>'+
						'</ul>';
					}
					$('#abut1>div').eq(0).prepend(txt);
					project.mLength=req.count;
					$('#abut1').nanoScroller()
				}
			}
		})
		//卖单
		$.ajax({
			url:"/Home/trade/orderRecords",
			type:'get',
			dataType:'json',
			data:{
				currency_id:project.id,
				type:'sell',
				p:0
			},
			success:function(req){
				if(req.count==0){
					return false
				}
				if(req.count>project.mmLength){
					var txt = "";
					for(var i=0;i<req.count-project.mmLength;i++){
						txt +='<ul>'+
						'<li>'+req.data[i].total+'</li>'+
						'<li>'+req.data[i].num+'</li>'+
						'<li>'+req.data[i].price+'</li>'+
						'</ul>';
					}
					$('#abut2>div').eq(0).prepend(txt);
					project.mmLength=req.count;
					$('#abut2').nanoScroller()
				}
			}
		})
	},1000)
}
project.scrooBot = function(){
	//成交记录
	$('#abut5').on("scrollend", function(e){
		if(project.CordLengh<30 || (project.CordLengh-30)/15<=project.record-1){
			return false
		}
		$.ajax({
			url:'/Home/trade/tradeRecords',
			dataType:'json',
			type:'get',
			data:{
				currency_id:project.id,
				p:project.record
			},
			success:function(req){
				if(req.count==0){
					return false
				}
				var txt =""
				for(var i=0;i<req.data.length;i++){
					txt += '<ul>'+
					'<li>'+req.data[i].price+'</li>'+
					'<li>'+req.data[i].num+'</li>'+
					'<li>'+req.data[i].add_time.split(' ')[1]+'</li>'+
					'</ul>';
				}
				$('#abut5>div').eq(0).append(txt);
				project.record++;
				project.CordLengh=req.count
				$("#abut5").nanoScroller();
			}
		})
	});
	//买单记录
	$('#abut1').on("scrollend", function(e){
		if(project.mLength<15 || project.mLength/15<=project.m-1){
			return false
		}
		$.ajax({
			url:"/Home/trade/orderRecords",
			type:'get',
			dataType:'json',
			data:{
				currency_id:project.id,
				type:'buy',
				p:project.m
			},
			success:function(req){
				if(req.count==0){
					return false
				}
				var txt = "";
				for(var i=0;i<req.data.length;i++){
					txt +='<ul>'+
					'<li>'+req.data[i].total+'</li>'+
					'<li>'+req.data[i].num+'</li>'+
					'<li>'+req.data[i].price+'</li>'+
					'</ul>';
				}
				$('#abut1>div').eq(0).append(txt);
				project.m++;
				project.mLength=req.count;
				$("#abut1").nanoScroller();
			}
		})
	});
	//卖单记录
	$('#abut2').on("scrollend", function(e){
		if(project.mmLength<15 || project.mmLength/15<=project.mm -1){
			return false
		}
		$.ajax({
			url:"/Home/trade/orderRecords",
			type:'get',
			dataType:'json',
			data:{
				currency_id:project.id,
				type:'sell',
				p:project.mm
			},
			success:function(req){
				if(req.count==0){
					return false
				}
				var txt = "";
				for(var i=0;i<req.data.length;i++){
					txt +='<ul>'+
					'<li>'+req.data[i].total+'</li>'+
					'<li>'+req.data[i].num+'</li>'+
					'<li>'+req.data[i].price+'</li>'+
					'</ul>';
				}
				$('#abut2>div').eq(0).append(txt);
				project.mm++;
				project.mmLength=req.count;
				$("#abut2").nanoScroller();
			}
		})
	});
}
project.initData = function(){
	//获取基本数据
	var url = objs.getUrl();
	if(!(url==undefined)){
		project.coin = url.coin
		project.ago =url.ago
		project.id=url.id
	}
	//成交记录
	$.ajax({
		url:'/Home/trade/tradeRecords',
		dataType:'json',
		type:'get',
		data:{
			currency_id:project.id,
			p:project.record,
			offset:45
		},
		success:function(req){
			if(req.count==0){
				return false
			}
			var txt =""
			for(var i=0;i<req.data.length;i++){
				txt += '<ul>'+

				'<li>'+req.data[i].price+'</li>'+
				'<li>'+req.data[i].num+'</li>'+
				'<li>'+req.data[i].add_time.split(' ')[1]+'</li>'+
				'</ul>'
			}
			$('#abut5>div').eq(0).append(txt);
			project.record++;
			project.CordLengh=req.count;
			$("#abut5").nanoScroller();
		}
	})
	//获取买单
	$.ajax({
		url:"/Home/trade/orderRecords",
		type:'get',
		dataType:'json',
		data:{
			currency_id:project.id,
			type:'buy',
			p:project.m
		},
		success:function(req){
			if(req.count==0){
				return false
			}
			var txt = "";
			for(var i=0;i<req.data.length;i++){
				txt +='<ul>'+
				'<li>'+req.data[i].total+'</li>'+
				'<li>'+req.data[i].num+'</li>'+
				'<li>'+req.data[i].price+'</li>'+
				'</ul>';
			}
			$('#abut1>div').eq(0).append(txt);
			project.m++;
			project.mLength=req.count;
			$("#abut1").nanoScroller();
		}
	})
	//获取卖单
	$.ajax({
		url:"/Home/trade/orderRecords",
		type:'get',
		dataType:'json',
		data:{
			currency_id:project.id,
			type:'sell',
			p:project.mm
		},
		success:function(req){
			if(req.count==0){
				return false
			}
			var txt = "";
			for(var i=0;i<req.data.length;i++){
				txt +='<ul>'+
				'<li>'+req.data[i].total+'</li>'+
				'<li>'+req.data[i].num+'</li>'+
				'<li>'+req.data[i].price+'</li>'+
				'</ul>';
			}
			$('#abut2>div').eq(0).append(txt);
			project.mm++;
			project.mmLength=req.count;
			$("#abut2").nanoScroller();
		}
	})
}
project.iconClick = function() {
	$('.idsa').on('click',function(){
		if($('.iconSelect').height()==0){
			$('.iconSelect').css('height','auto')	
		}else{
			$('.iconSelect').css('height','0')
		}
	})
	$('.iconSelect li').on('click',function(){
		$('.iconSelect').css('height','0')
	})
}
project.adNotClick = function() {
	$('.ech span').on('click',function(){
		$(this).addClass('thisEch').siblings().removeClass('thisEch');
		$('.echTab').find('div').eq($(this).index()).css('display','block').siblings().css('display','none')
	})
	$('.users span').on('click',function(){
		$(this).addClass('thison').siblings().removeClass('thison');
		$('.userson>div').eq($(this).index()).css('display','block').siblings().css('display','none')
	})
}
project.cheight = function () {
	var winHeight = $(window).height();
	var winWidth = $(window).width();
	winHeight = winHeight -77
	if(winWidth>=601 && winWidth<=1000){
		$('#abut3').css('height',(winHeight-530)+'px')
		$('#abut4').css('height',(winHeight-530)+'px')
	}
	if(winWidth<=1000){
		return false
	}
	if(winHeight<=660){
		return false
	}else{
		$('.template1').css('height',winHeight+'px');
		$('#abut5').css('height',(winHeight-74.5)+'px')
		$('#abut3').css('height',(winHeight-457.5)+'px')
		$('#abut4').css('height',(winHeight-457.5)+'px')
		$('#abut2').css('height',(winHeight-121)/2+'px')
		$('#abut1').css('height',(winHeight-121)/2+'px')
	}
}
project.init();
