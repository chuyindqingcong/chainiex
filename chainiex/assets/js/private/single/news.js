var obj = new obje();
obj.menu();
//公告
var news = 0,
    zc = 0,
    newsLen = 0,
    zcLen = 0;
getNew(news,1,$('#news1'),newsLen,1);
getNew(zc,2,$('#news2'),zcLen,2);
function getNew(index,type,obj,len,us) {
    $.ajax({
        url:'/message/news',
        type:'get',
        dataType:'json',
        data:{
            current:index*10,
            limit:10,
            type:type
        },
        success:function (req) {
            var txt ='';
            for(var i=0;i<req.data.data.length;i++){
                txt +='<li class="onli" data-src="/help/news?id='+req.data.data[i].id+'">'+req.data.data[i].abs+'</li>'
            }
            if(len==0 && len !=undefined){
                if(us==1){
                    newsLen = Math.ceil(req.data.cnt);
                }else{
                    zcLen = Math.ceil(req.data.cnt);
                }
                if(req.data.cnt<10){
                    obj.next().find('span').eq(1).removeClass('props')
                }
            }
            if(us==1){
                if(index<=0){
                    $('#page').removeClass('props');
                }else if(index>=(Math.ceil(req.data.cnt/10)-1)){
                    $('#page').addClass('props');
                    $('#next').removeClass('props');
                }else{
                    $('#page').addClass('props');
                    $('#next').addClass('props');
                }
            }else{
                if(index<=0){
                    $('#page1').removeClass('props')
                }else if(index>=(Math.ceil(req.data.cnt/10)-1)){

                    $('#page1').addClass('props');

                    $('#next1').removeClass('props');
                }else{

                    $('#page1').addClass('props');

                    $('#next1').addClass('props');
                }
            }
            obj.html(txt);
        }
    })
}
// $('.news-title').find('span').each(function () {
//     $(this).on('click',function () {
//         alert($(this).index())
//     })
// })
$('.news-title').find('span').each(function () {
    $(this).on('click',function () {
        $(this).addClass('title-span').siblings().removeClass('title-span')
        $('.ulis').eq($(this).attr('data-status')).css('display','block').siblings().css('display','none')
    })
});
$('#page').on('click',function () {
    if(news<=0){
        return false
    }else{
        news--;
        getNew(news,1,$('#news1'),newsLen,1);
    }
});
$('#next').on('click',function () {
    if(news>=Math.ceil(newsLen/10)-1){
        return false
    }else{
        news++;
        getNew(news,1,$('#news1'),newsLen,1);
    }
});
$('#page1').on('click',function () {
    if(zc<=0){
        return false
    }else{
        zc--;
        getNew(zc,2,$('#news2'),zcLen,2);
    }
});
$('#next1').on('click',function () {
    if(zc>=Math.ceil(zcLen/10)-1){
        return false
    }else{
        zc++;
        getNew(zc,2,$('#news2'),zcLen,2);
    }
});
var url = obj.getUrl();
$.ajax({
    url:'/message/news/get',
    type:'get',
    dataType:'json',
    data:{
        id:url.id
    },
    success:function(req){
       $('.news-left>h3').html(req.data.data.title);
       $('.news-left>span').eq(0).html(obj.formTime(req.data.data.gmtCreate));
       if(req.data.data.type==1){
           $('.news-left>span').eq(1).html('资讯');
       }else{
           $('.news-left>span').eq(1).html('政策');
       }
        $('.news-left>div').html(req.data.data.content)
    }
})
// $(window).scroll(function(){
//     console.log($(window).scrollTop())
//     console.log($(document).height())
//     console.log($(window).height())
//     if(($(window).scrollTop()+$(window).height())>=$(document).height()-300){
//         $('.news-right').css('position','absolute');
//         $('.news-right').css('bottom','78px');
//         $('.news-right').css('top','inherit')
//     }else{
//         $('.news-right').css('position','fixed');
//         $('.news-right').css('bottom','inherit');
//         $('.news-right').css('top','218px')
//     }
// })