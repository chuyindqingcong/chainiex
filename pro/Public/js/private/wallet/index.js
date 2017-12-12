var project={};

project.init = function () {
	var objs = new obje()
	//默认信息
	this.id = "37"	//币种ID
	this.iconName="BTC"
	this.orders=0 //订单总数
	this.porder=1 //订单当前页数
	this.me = 0 //历史记录总数
	this.pme = 1 //记录当前页数
	this.pcz = 1 //充值当前页数
	this.cz =0 //充值总数
	this.ptx=1;
	this.tx = 0;
	//copy 功能
	this.copy();
	//充值提现功能
	this.cztx()
	//切换
	this.qh()
	//设置默认高
	this.sheight()
	//平板和手机处理
	this.middle()
	//选择coin
	this.coinSelect()
	//设置导航条切换
	this.tiTab()
	//获取coin信息
	this.getCoins()
	//初始化基本信息
	this.initData()
	//滚动事件
	this.scrooBot()
	//删除订单
	this.delOrder()
	//获取全部币种
	this.uGetCoins()
}
project.ugetRech = function () {

}
project.uGetCoins = function () {
	$.ajax({
		url:'/Home/user/getMoney',
		type:'get',
		success:function(req){
			var txt = "";
			for(var i=0;i<req.length;i++) {
				txt +='<div data-id="'+req[i].currency_id+'" data-coin="'+req[i].currency_mark+'">'+
										'<div><img src="'+req[i].currency_logo+'"></div>'+
										'<div class="btcs">'+
											'<div class="btc">'+
												'<span>'+req[i].currency_mark+' 余额</span>'+
											'</div>'+
											'<div  class="font12">'+
												'<span>'+req[i].balance+'</span>'+req[i].currency_mark+
												 // = <span>0.00</span>CNY'+
											'</div>'+
										'</div>'+
										'<div class="buttonSpan">'+
											'<span class="czz spans" data-status="0">充值</span>'+
											'<span class="txx spans" data-status="0">提现</span>'+
										'</div>'+
									'</div>'
			}
			$('.midcli').append(txt);
			$('.midcli>div').eq(0).addClass('thisCoin')
			$("#abut").nanoScroller();
		}
	})
}
project.delOrder = function () {
	$('#abut1').on('click','.icondel',function(){
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
project.meCount = function() {
	$.ajax({
		url:'/Home/trade/tradeRecords',
		type:'get',
		data:{
			currency_id:project.id,
			sign:'my'
		},
		success:function(req){
			var txt='';
			var orcon=''
			for(var i=0;i<req.data.length;i++){
				if(req.data[i].type=="buy"){
					orcon=	'<li style="color:#00A63F">'+req.data[i].price+'</li>'
				}else{
					orcon=	'<li style="color:#f03838">'+req.data[i].price+'</li>'
				}
				txt+='<ul>'+
						'<li>'+req.data[i].add_time+'</li>'+
								orcon+
							'<li>'+req.data[i].num+'</li>'+
						'<li>'+req.data[i].money+'</li>'+
					'</ul>'
			}
			$('#abut6>div').eq(0).append(txt);
			$('#abut6').nanoScroller()
		}
	})
}
project.scrooBot = function() {
	//订单滚轮事件
	$('#abut1').on("scrollend", function(e){
		if(project.CordLengh<30 || (project.CordLengh-30)/15<=project.record-1){
			return false
		}
   		$.ajax({
			url:'/Home/trade/myOrders',
			type:'get',
			data:{
				currency_id:project.id,
				p:project.porder
			},
			success:function(req){
				var txt ='';
				var orcon=''
			for(var i=0;i<req.data.length;i++){
				if(req.data[i].type=="buy"){
					orcon=	'<li style="color:#00A63F">'+req.data[i].price+'</li>'
				}else{
					orcon=	'<li style="color:#f03838">'+req.data[i].price+'</li>'
				}
				txt+='<ul>'+
						'<li>'+req.data[i].add_time+'</li>'+
						orcon+
						'<li>'+req.data[i].num+'</li>'+
						'<li>'+req.data[i].sum+'</li>'+
						'<li><svg class="icon icondel" aria-hidden="true" data-orid="'+req.data[i].orders_id+'"><use xlink:href="#icon-guanbi"></use></svg></li>'+
					'</ul>'
			}
				$('#abut1>div').eq(0).append(txt);
				project.orders=req.count;
				project.porder++;
				$("#abut1").nanoScroller();
			}
		})
	});
	$('#abut4').on("scrollend",function(){
		if(project.me<30 || (project.me-30)/15<=project.record-1){
			return false
		}
		//历史记录
		$.ajax({
			url:'/Home/trade/tradeRecords',
			type:'get',
			data:{
				currency_id:project.id,
				sign:'my',
				p:project.pme
			},
			success:function(req){
				var txt='';
				var orcon=''
			for(var i=0;i<req.data.length;i++){
				if(req.data[i].type=="buy"){
					orcon=	'<li style="color:#00A63F">'+req.data[i].price+'</li>'
				}else{
					orcon=	'<li style="color:#f03838">'+req.data[i].price+'</li>'
				}
				txt+='<ul>'+
						'<li>'+req.data[i].add_time+'</li>'+
								orcon+
							'<li>'+req.data[i].num+'</li>'+
						'<li>'+req.data[i].money+'</li>'+
					'</ul>'
			}
				$('#abut4>div').eq(0).append(txt);
				project.me=req.count;
				project.pme ++;
				$("#abut4").nanoScroller();
			}
		})
	})
		//充值记录
	$('#abut2').on('scrollend',function(){
		if(project.cz<30 || (project.cz-30)/15<=project.record-1){
			return false
		}
		$.ajax({
			url:'/Home/user/getRecharge',
			type:'get',
			data:{
				p:project.pcz,
				currency_id:project.id
			},
			success:function(req){
				var txt ='';
				for(var i=0;i<req.data.length;i++){
					txt +='<ul>'+
													'<li>'+req.data[i].add_time+'</li>'+
													'<li class="midhide">'+req.data[i].url+'<span>地址状态</span></li>'+
													'<li>'+req.data[i].num+project.iconName+'</li>'+
													'<li>'+req.data[i].status+'</li>'+
												'</ul>'
				}
				$('#abut2>div').append(txt);
				project.pcz++;
				$('#abut2').nanoScroller()
			}
		})
	})
}
project.initData = function () {
	$.ajax({
		url:'/Home/trade/myOrders',
		type:'get',
		data:{
			currency_id:project.id
		},
		success:function(req){
			var txt ='';
			var orcon=''
			for(var i=0;i<req.data.length;i++){
				if(req.data[i].type=="buy"){
					orcon=	'<li style="color:#00A63F">'+req.data[i].price+'</li>'
				}else{
					orcon=	'<li style="color:#f03838">'+req.data[i].price+'</li>'
				}
				txt+='<ul>'+
						'<li>'+req.data[i].add_time+'</li>'+
						orcon+
						'<li>'+req.data[i].num+'</li>'+
						'<li>'+req.data[i].sum+'</li>'+
						'<li><svg class="icon icondel" aria-hidden="true" data-orid="'+req.data[i].orders_id+'"><use xlink:href="#icon-guanbi"></use></svg></li>'+
					'</ul>'
			}
			$('#abut1>div').eq(0).append(txt);
			project.orders=req.count;
			project.porder++;
			$("#abut1").nanoScroller();
		}
	})
	//历史记录
	$.ajax({
		url:'/Home/trade/tradeRecords',
		type:'get',
		data:{
			currency_id:project.id,
			sign:'my'
		},
		success:function(req){
			var txt='';
			var orcon=''
			for(var i=0;i<req.data.length;i++){
				if(req.data[i].type=="buy"){
					orcon=	'<li style="color:#00A63F">'+req.data[i].price+'</li>'
				}else{
					orcon=	'<li style="color:#f03838">'+req.data[i].price+'</li>'
				}
				txt+='<ul>'+
						'<li>'+req.data[i].add_time+'</li>'+
								orcon+
							'<li>'+req.data[i].num+'</li>'+
						'<li>'+req.data[i].money+'</li>'+
					'</ul>'
			}
			$('#abut4>div').eq(0).append(txt);
			project.me=req.count;
			project.pme ++;
			$('#abut4').nanoScroller()
		}
	})
	//充值记录
	$.ajax({
		url:'/Home/user/getRecharge',
		type:'get',
		data:{
			p:project.pcz,
			currency_id:project.id
		},
		success:function(req){
			try{
				var txt ='';
				for(var i=0;i<req.data.length;i++){
					txt +='<ul>'+
													'<li>'+req.data[i].add_time+'</li>'+
													'<li class="midhide">'+req.data[i].url+'<span>地址状态</span></li>'+
													'<li>'+req.data[i].num+project.iconName+'</li>'+
													'<li>'+req.data[i].status+'</li>'+
												'</ul>'
				}
				$('#abut2>div').append(txt);
				project.pcz++;
				project.cz=req.count;
				$('#abut2').nanoScroller()
			}catch(e){}
		}
	})
	//提现记录
	$.ajax({
		url:'/Home/user/getWithdraw',
		type:'get',
		data:{
			p:project.ptx,
			currency_id:project.id
		},
		success:function(req){
			try{
				var txt ='';
				for(var i=0;i<req.data.length;i++){
					txt +='<ul>'+
													'<li>'+req.data[i].add_time+'</li>'+
													'<li class="midhide">'+req.data[i].url+'<span>地址状态</span></li>'+
													'<li>'+req.data[i].num+project.iconName+'</li>'+
													'<li>'+req.data[i].status+'</li>'+
												'</ul>'
				}
				$('#abut3>div').append(txt);
				project.ptx++;
				project.tx=req.count;
				$('#abut3').nanoScroller()
			}catch(e){}
		}
	})
}
project.getCoins = function () {
	$.ajax({
		url:'/Home/orders/CurrencyInfo',
		type:'post',
		data:{
			p:project.coinCount
		},
		success:function(req){
			var txt = '';
			for(var i=0;i<req.data.length;i++){
				txt +='<li data-id = "'+req.data[i].currency_id+'">'+req.data[i].currency_mark+'</li>'
			}
			$('#coin1>ul').append(txt);
			$('#coin2>ul').append(txt)
		}
	})
}
project.tiTab = function () {
	$('.tabH2 h2').on('click',function(){
		$(this).addClass('tabColors').siblings().removeClass('tabColors');
		$('.tabcont>div').eq($(this).index()).css('display','block').siblings().css('display','none')
	})
}

project.coinSelect = function () {
	$('.iClickIcon').on('click',function(){
		if($(this).attr('data-status')==0){
			$('.icorDiv').css('display','block')
			$('.iClickIcon').attr('data-status',1)
		}else{
			$('.icorDiv').css('display','none')
			$('.iClickIcon').attr('data-status',0)
		}
	})
	
	$('#coin1').on('click','li',function(){
		$(this).parents('.icorDiv').css('display','none').prev().prev().html($(this).html())
		$('.icorDiv').css('display','none');
		$('.iClickIcon').attr('data-status',0);
		project.id = $(this).attr('data-id');
		$.ajax({
			url:'/Home/trade/myOrders',
			type:'get',
			data:{
				currency_id:project.id
			},
			success:function(req){
				var txt ='';
				var orcon=''
			for(var i=0;i<req.data.length;i++){
				if(req.data[i].type=="buy"){
					orcon=	'<li style="color:#00A63F">'+req.data[i].price+'</li>'
				}else{
					orcon=	'<li style="color:#f03838">'+req.data[i].price+'</li>'
				}
				txt+='<ul>'+
						'<li>'+req.data[i].add_time+'</li>'+
						orcon+
						'<li>'+req.data[i].num+'</li>'+
						'<li>'+req.data[i].sum+'</li>'+
						'<li><svg class="icon icondel" aria-hidden="true" data-orid="'+req.data[i].orders_id+'"><use xlink:href="#icon-guanbi"></use></svg></li>'+
					'</ul>'
			}
				project.orders=req.count;
				project.porder=1;
				$('#abut1>div').eq(0).html(txt);
			}
		})
	})
	$('#coin2').on('click','li',function(){
		$(this).parents('.icorDiv').css('display','none').prev().prev().html($(this).html())
		$('.icorDiv').css('display','none');
		$('.iClickIcon').attr('data-status',0);
		project.id = $(this).attr('data-id');
		
		$.ajax({
			url:'/Home/trade/tradeRecords',
			type:'get',
			data:{
				currency_id:project.id,
				sign:'my'
			},
			success:function(req){
				var txt='';
				var orcon=''
				for(var i=0;i<req.data.length;i++){
					if(req.data[i].type=="buy"){
						orcon=	'<li style="color:#00A63F">'+req.data[i].price+'</li>'
					}else{
						orcon=	'<li style="color:#f03838">'+req.data[i].price+'</li>'
					}
					txt+='<ul>'+
							'<li>'+req.data[i].add_time+'</li>'+
									orcon+
								'<li>'+req.data[i].num+'</li>'+
							'<li>'+req.data[i].money+'</li>'+
						'</ul>'
				}
				$('#abut4>div').eq(0).append(txt);
				project.me=req.count;
				project.pme ++;
				$('#abut4').nanoScroller()
			}
		})
	})
}
project.middle = function(){
	if($(window).width()<= 1000){
		$('.wrap').on('click','.midcli>div',function(){
			$('.amdLeft').css('display','none')
			$('.amdRight').css('display','block')
		})
		$('.spsd').on('click',function(){
			$('.amdLeft').css('display','block')
			$('.amdRight').css('display','none')
		})
	}
	$(window).on('resize',function(){
		if($(window).width()<=1000){
			$('.midcli>div').on('click',function(){
				$('.amdLeft').css('display','none')
				$('.amdRight').css('display','block')
			})
			$('.spsd').on('click',function(){
				$('.amdLeft').css('display','block')
				$('.amdRight').css('display','none')
			})
		}else{
			$('.midcli>div').unbind()
			$('.amdRight').css('display','block')
			$('.amdLeft').css('display','block')
		}
	})
}
project.qh = function(){
	$('.qhs .icon').on('click',function(){
//		$(this).addClass('iconc').siblings().removeClass('iconc');
//		$('.abuts>div').eq($(this).index()).css('display','block').siblings().css('display','none')
		$('.abuts>div').eq($(this).index()).css('display','block').siblings().css('display','none')
		if($(this).index()==0){
			$('.qhs .icon').eq($(this).index()).css('color','#00a63f').siblings().css('color','#cecece')
		}else{
				$('.qhs .icon').eq($(this).index()).css('color','#f03838').siblings().css('color','#cecece')
		}
	})
	//币种切换
	$('#abut').on('click','.midcli>div',function(){
		project.id=$(this).attr('data-id');
		project.iconName=$(this).attr('data-coin');
		project.pcz=1;
		project.cz=0;
		project.ptx=1;
		project.tx=0;
		$(this).addClass('thisCoin').siblings().removeClass('thisCoin');
		//充值记录
		$.ajax({
			url:'/Home/user/getRecharge',
			type:'get',
			data:{
				p:project.pcz,
				currency_id:project.id
			},
			success:function(req){
				try{
					var txt ='';
					for(var i=0;i<req.data.length;i++){
						txt +='<ul>'+
														'<li>'+req.data[i].add_time+'</li>'+
														'<li class="midhide">'+req.data[i].url+'<span>地址状态</span></li>'+
														'<li>'+req.data[i].num+project.iconName+'</li>'+
														'<li>'+req.data[i].status+'</li>'+
													'</ul>'
					}
					$('#abut2>div').html(txt);
					project.pcz++;
					project.cz=req.count;
					$('#abut2').nanoScroller()
				}catch(e){}
			}
		})
		//提现记录
		$.ajax({
			url:'/Home/user/getWithdraw',
			type:'get',
			data:{
				p:project.ptx,
				currency_id:project.id
			},
			success:function(req){
				try{
					var txt ='';
					for(var i=0;i<req.data.length;i++){
						txt +='<ul>'+
														'<li>'+req.data[i].add_time+'</li>'+
														'<li class="midhide">'+req.data[i].url+'<span>地址状态</span></li>'+
														'<li>'+req.data[i].num+project.iconName+'</li>'+
														'<li>'+req.data[i].status+'</li>'+
													'</ul>'
					}
					$('#abut3>div').html(txt);
					project.ptx++;
					project.tx=req.count;
					$('#abut3').nanoScroller()
				}catch(e){}
			}
		})
	})
}
project.sheight = function(){
	var winHeight = $(window).height();
	var winWidth = $(window).width();
		winHeight = winHeight -129
	if(winWidth>=601 && winWidth<=1000){
		
	}
	if(winWidth<=1000){
		return false
	}
	if(winHeight<=660){
		return false
	}else{
		$('.nano').css('height',(winHeight-50)+'px')
		$('.nano1').css('height',(winHeight)+'px')
	}
}
project.cztx = function () {
	$('.wrap').on('click','.czz',function(){
		$('.hideDiv').css('display','block')
		$('.chong').css('display','block')
		$('.tx').css('display','none')
		$('.tmc').css('display','block')
		$('.czz').css({'color':'#bdbdbd','border':'1px solid #e0e0e0'})
		$('.txx').css({'color':'#bdbdbd','border':'1px solid #e0e0e0'})
		$(this).css({'color':'#00a63f','border':'1px solid #00a63f'})
	})
	$('.wrap').on('click','.txx',function(){
		$('.hideDiv').css('display','block')
		$('.chong').css('display','none')
		$('.tx').css('display','block')
		$('.txx').css({'color':'#bdbdbd','border':'1px solid #e0e0e0'})
		$('.czz').css({'color':'#bdbdbd','border':'1px solid #e0e0e0'})
		$(this).css({'color':'#f03838','border':'1px solid #f03838'})
	})
	$('.hidebg').on('click',function(){
		$('.hideDiv').css('display','none')
	})
	$('.czdz .icon').on('click',function(){
		$('.hideDiv').css('display','none')
	})
	$('.iconft').on('click',function(){
		if($('.ulisadd').css('display')=="block"){
			$('.ulisadd').css('display','none')
		}else{
			$('.ulisadd').css('display','block')
		}
	})
	$('.ulisadd ul li').on('click',function(){
		$('#senInput').val($(this).html())
		$('.ulisadd').css('display','none')
	})
	$('#shouch').on('click',function(){
		$('.tmc').css('display','none')
	})
}
project.copy = function () {
	$('.hideDiv').on('click','#copy',function () {
	    try{
	        var Url2=document.getElementById("aa");
	        Url2.select();
	        document.execCommand("Copy");
	        alert("已复制好，可贴粘。");
	    }catch (err){
	        alert("复制失败，请手动复制。");
	    }
	});
}
project.init();