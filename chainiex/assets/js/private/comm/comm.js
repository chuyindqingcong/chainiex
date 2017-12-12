function  obje() {
    var obj = {};
    obj.dht = function () { //导航条处理
        if(window.location.pathname.split('/')[window.location.pathname.split('/').length-1]=='index' || window.location.pathname.split('/')[window.location.pathname.split('/').length-1]==''||window.location.pathname.split('/')[window.location.pathname.split('/').length-1]=='trade'){
            var i=0;
            $('.control').each(function(){
                // $(this).attr('data-index',i++);
                // $(this).on('click',function(){
                //     $('.wrap-login').find('span').eq($(this).attr('data-index')).addClass('login-q').siblings().removeClass('login-q');
                //     $('.regs').eq($(this).attr('data-index')).css('display','block').siblings().css('display','none');
                //     $('.imgY').attr('src','/captcha?'+time);
                //     $('.wrap-three').css('display','none');
                //     setTimeout(function () {
                //         $('.wrap-three').css('display','block');
                //     },100)
                //     $('body').animate({scrollTop:0},300)
                // })
                $('.control').addClass('onli');
            })
        }else{
            $('.control').addClass('onli');
            // $('.header-top div ul li b').css('border-top','5px solid #fff');
            // $('.header-top h2').css('color','#666');
            // $('.control').css({'color':'#666'});

        }
    }
    obj.onli = function () { //a链接
        $('body').on('click','.onli',function () {
            if($(this).attr('data-src')==(window.location.pathname+window.location.search)){
                return false
            }else{
                location.href=$(this).attr('data-src')
            }
        })
    }
    obj.bottom = function () { //判断底部到底了没
        if($(window).height()>($('.footer').offset().top+280)){
            $('.footer').css({'position':'fixed','bottom':'0'})
        }
    }
    obj.menu = function () { //二级菜单
        var loca = window.location.pathname;
        $('.user-dh').find('li').each(function () {
            if($(this).attr('data-src')==loca){
                $(this).addClass('this-li')
            }
        })
    }
    obj.eachJson=function(){ //条件循环
        var req = {};
        var jsons=$('#json1').serializeArray();
        for(var i=0;i<jsons.length;i++){
            if(jsons[i].value!=""){
                req[jsons[i].name]=jsons[i].value;
            }
        }
        return req;
    };
    obj.datatable = function (table,url,columns,eachJson,type,funbtn,lengthm,lenms){//表格配置
        table.dataTable({
            "ajax": {
                "type": type?type:'post',
                "url":url,
                "data":function(d){
                    var page = (d.start/d.length)+1;
                    var rows = d.length;
                    var req={};
                    req=eachJson();
                    req["current"]=page;
                    req["pageSize"]=rows;
                    if(d.order.length>0){
                        var index = d.order[0].column;
                        var sort = d.order[0].dir;
                        var name = d.columns[index].data;
                        req["sort"] = name;
                        req["order"] =sort;
                    };
                    return req
                },
                "dataSrc": function ( json ) {
                    var data=null;
                    if(json.data.user && json.data.page.totalResults>0){
                        for(var i=0;i<json.data.page.data.length;i++){
                            for(var j=0;j<json.data.user.length;j++){
                                if(json.data.page.data[i].uid==json.data.user[j].uid){
                                    for( obj in json.data.user[j]){
                                       json.data.page.data[i][obj]=json.data.user[j][obj]
                                    }
                                }
                            }
                        }
                    }
                    data = json.data.page?json.data.page.data:json.data.funds.data?json.data.funds.data:json.data.funds?json.data.funds:'null';
                    data = data?data:{};
                    json.recordsFiltered = json.data.page?json.data.page.totalResults:json.data.funds?json.data.funds.totalResults:'0';
                    return data;
                }
            },
            "aoColumns" : columns,
            // "columnDefs" :
            //     [{
            //         "orderable" : false, // 禁用排序
            //         "targets" : [0], // 指定的列
            //         "data" : "id",
            //         "render" : function(data, type, full, meta) {
            //             return '<input type="checkbox" value="'+ data + '" name="id"/>';
            //         }
            //     }],
            "oLanguage" : { // 国际化配置
                "sProcessing" : "正在获取数据，请稍后...",
                "sLengthMenu" : "显示 _MENU_ 条",
                "sZeroRecords" : "没有找到数据",
                "sInfo" : "从 _START_ 到  _END_ 条记录 总记录数为 _TOTAL_ 条",
                "sInfoEmpty" : "记录数为0",
                "sInfoFiltered" : "",
                "sInfoPostFix" : "",
                "sSearch" : "搜索",
                "sUrl" : "",
                "oPaginate" : {
                    "sFirst" : "第一页",
                    "sPrevious" : "<",
                    "sNext" : ">",
                    "sLast" : "最后一页"
                }
            },
            "searching":false,//禁用搜索条
            'scrollX': false, // 显示水平滚动条
            'autoWidth': false, //字段适应长度，false则关闭
            "ordering":true, //点击字段排序功能关闭
            'serverSide': true, //是否开启服务器模式
            'stateSave': false, //保存状态 - 在页面重新加载的时候恢复状态（页码等内容）
            'processing': true, //当表格处在处理过程（例如排序）中时，启用或者禁止 'processing'指示器的显示
            'lengthMenu': lengthm?lengthm:[10,30], //显示每页大小的下拉框中的选项
            'lengthChange':false, //禁用用户选择下拉数量
            'sPaginationType': 'simple_numbers', //分页显示所有按钮
            'displayStart':0,
            "info": false,
            "order":[],
            // preDrawCallback:function () {
            //    $('.paging_simple_numbers').css('display','none');
            // },
            // rowCallback:function () {
            //     var lenm=lenms?lenms:10;
            //     if(table.find('.dataTables_empty').length>0){
            //         console.log(1111)
            //     }else{
            //         if( table.find('tr').length>lenm){
            //             table.next().css('display','block')
            //         }
            //     }
            //     console.log('ddddd')
            // },
            initComplete:function(){
                var lenm=lenms?lenms:10;
                if(table.find('.dataTables_empty').length>0){

                }else{
                    if( table.find('tr').length>lenm){
                        table.next().css('display','block')
                    }
                }
                if(funbtn){
                    funbtn();
                }
                $('input[name=allChecked]').click(function(){
                    if(this.checked){
                        table.find('tbody tr').each(function(){
                            if($(this).find('input[type=checkbox]').prop('checked')==false){
                                $(this).find('input[type=checkbox]').click();
                            }
                        });
                    }else{
                        table.find('tbody tr').each(function(){
                            if($(this).find('input[type=checkbox]').prop('checked')==true){
                                $(this).find('input[type=checkbox]').click();
                            }
                        });
                    }
                });
            },//初始化后加载的函数
            drawCallback: function( settings ) {
                // $('input[name=allChecked]')[0].checked=false;//取消全选状态
            }
        })
        return table
    }
    obj.formTime = function (data) {
        var create = new Date(data);
        var d = create.getDate();
        var y = create.getMonth()+1;
        var m = create.getFullYear();
        var h = create.getHours();
        var f = create.getMinutes();
        var s = create.getSeconds();
        return m+'-'+this.timer(y)+'-'+this.timer(d)+' '+this.timer(h)+':'+this.timer(f)+':'+this.timer(s);
    }
    obj.getStyle = function (obj,attr) {
        if(obj.currentStyle){
            return obj.currentStyle[attr];
        }else{
            return getComputedStyle(obj,false)[attr];
        }
    }
    obj.getMess = function () {
        if($('#tmess').length>=1){
            $.ajax({
                url:'/message/count',
                type:'get',
                dataType:'json',
                success:function (obj) {
                    if(obj.code==0){
                        if(obj.data.count==0 && $('.mescount').length<=0){
                            return false
                        }
                        $('#countMess').css('display','inline-block');
                        $('#tmess').append('<span style="position: absolute;text-align: center;width: 25px;font-size: 12px;top: -4px;">'+obj.data.count+'</span>');
                        if($('.mescount').length>0){
                            $('.dist').html(obj.data.count);
                            $('.mescount').html(obj.data.total)
                        }
                    }
                }
            })
        }
    }
    obj.setUl=function () {
        $('.li-hover ul').each(function () {
            var width=4;
            $(this).find('li').each(function () {
                width += parseInt($(this).css('width'));
            })
            $(this).css('width',(width-2)+'px')
            $(this).css('margin-left','-'+(width/2-40)+'px')
        })
    }
    obj.getUrl = function(){
        var url = window.location.search;
        var obj = new Object();
        if(url.indexOf('?')!=-1){
            var txt = url.substr(1);
            var strs = txt.split('&');
            for(var i=0;i<strs.length;i++){
                obj[strs[i].split('=')[0]]=strs[i].split('=')[1];
            }
            return obj;
        }
    }
    obj.userUp = function () {
        $('#userUp').on('click',function () {
            $.ajax({
                url:'/user/logout',
                type:'get',
                success:function () {
                    window.location.href="/"
                }
            })
        })
    }
    obj.yesNum=function () {
        salf = this.num;
        $('.yesNum').each(function () {
            $(this).on('keydown',function (e) {
                var j=0;
                for(var i=0;i<salf.length;i++){
                    if(e.which == salf[i]){
                        j=1;
                        break
                    }
                }
                if((e.which == 190 || e.which == 110) && $(this).val().indexOf('.')!=-1){
                    return false
                }
                if(j==0){
                    return false
                }
            })
        })
    }
    obj.timer = function (data) {
        return parseInt(data/10)>0?data:'0'+data;
    }
    obj.fds = function (a,b) {//*
        a = a.toString();
        b = b.toString();
        var d = 0;
        var c= 0;
        try{
            c=a.split('.')[1].length
        }catch(f){c=0}
        try{
            d=b.split('.')[1].length
        }catch (f){d =0}
        return parseFloat((Number(a.replace('.',''))*Number(b.replace('.',''))/Math.pow(10,c+d)).toFixed(8))
    }
    obj.nofds = function (a,b) {///
        var t1=0,t2=0,r1,r2;
        try{t1=a.toString().split(".")[1].length}catch(e){t1=0}
        try{t2=b.toString().split(".")[1].length}catch(e){t2=0}
        with(Math){
            r1=Number(a.toString().replace(".",""))
            r2=Number(b.toString().replace(".",""))
            return parseFloat(((r1/r2)*pow(10,t2-t1)).toFixed(8));
        }
    }
    obj.addnum = function (a,b) {//+
        var r1,r2,m;
        try{r1=a.toString().split(".")[1].length}catch(e){r1=0}
        try{r2=b.toString().split(".")[1].length}catch(e){r2=0}
        m=Math.pow(10,Math.max(r1,r2))
        return parseFloat(((a*m+b*m)/m).toFixed(8))
    }
    obj.alert=function () {
        window.alert=function (val) {
            if(window.alertTime){
                clearTimeout(window.alertTime)
            }else{
                window.alertTime=null
            }
            var div=null
            if(document.getElementById('alert1')==null ||document.getElementById('alert1')=='undefined'){
                div = document.createElement('div');
                div.setAttribute('style',"height:30px;line-height:30px;background:rgba(0,0,0,.5);position:fixed;top:0px;left:0;color:#fff;padding:10px;opacity:1;border-radius:5px;z-index:999999999999");
                div.setAttribute('id','alert1');
                div.innerHTML=val;
                document.body.appendChild(div);
                var widht=0;
                div=document.getElementById('alert1');
                if(div.currentStyle)
                {
                    width=div.currentStyle['width'];
                }
                else
                {
                    width=getComputedStyle(div, false)['width'];
                }
                width=parseInt(width)/2;
                div.style.left='50%';
                div.style.top='50%';
                div.style.marginTop="-20px";
                div.style.marginLeft='-'+width+'px';

                window.alertTime = setTimeout(function () {
                    div=document.getElementById('alert1');
                    div.parentNode.removeChild(div);
                },2000)
            }else{
                div=document.getElementById('alert1');
                div.parentNode.removeChild(div);
                div = document.createElement('div');
                div.setAttribute('style',"height:30px;line-height:30px;background:rgba(0,0,0,.5);position:fixed;top:0px;left:0;color:#fff;padding:10px;opacity:1;border-radius:5px");
                div.setAttribute('id','alert1');
                div.innerHTML=val;
                document.body.appendChild(div);
                var widht=0;
                div=document.getElementById('alert1');
                if(div.currentStyle)
                {
                    widht=div.currentStyle['width'];
                }
                else
                {
                    width=getComputedStyle(div, false)['width'];
                }
                width=parseInt(width)/2;
                div.style.left='50%';
                div.style.top='50%';
                div.style.marginTop="-20px";
                div.style.marginLeft='-'+width+'px';

                window.alertTime= setTimeout(function () {
                    div=document.getElementById('alert1');
                    div.parentNode.removeChild(div);

                },2000)
            }
        }
    }
    obj.init = function () {
        obj.dht();
        obj.onli();
        obj.bottom();
        obj.getMess();
        obj.setUl();
        obj.userUp();
        obj.alert()
        obj.num = [48,49,50,51,52,53,54,55,56,57,9,8,96,97,98,99,100,101,102,103,104,105,190,110,37,38,39,40];
    }
    obj.init();
    return obj;
}