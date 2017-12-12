var obj = new obje();
obj.menu();
//公告
var news = 1,
    newsLen = 0;
getNew(news,1,$('#news1'),newsLen);
var url = obj.getUrl();
function getNew(index,type,objs,len) {
    $.ajax({
        url:'/notice/list',
        type:'get',
        dataType:'json',
        data:{
            current:index,
            pageSize:10,
            content:type
        },
        success:function (req) {
            var txt ='';
            var deta = null;
            for(var i=0;i<req.data.notices.length;i++){
                txt +='<li class="onli" data-src="/help/details?id='+req.data.notices[i].id+'">'+req.data.notices[i].title+'</li>';
                if(url.id == req.data.notices[i].id){
                    deta = req.data.notices[i];
                }
            }
            if(len==0 && len !=undefined){

                len =Math.ceil(req.data.notices.length);
                // len = Math.ceil(req.data.cnt);
                if(req.data.notices.length<10){
                    objs.next().find('span').eq(1).removeClass('props')
                }
            }

            if(index<=1){
                $('#page').removeClass('props');
                $('#page1').removeClass('props')
            }else if(index>=3){
                $('#next').removeClass('props');
                $('#next1').removeClass('props');
            }else{
                $('#page').addClass('props');
                $('#page1').addClass('props');
                $('#next').addClass('props');
                $('#next1').addClass('props');
            }
            var timers =obj.formTime(deta.gmtCreate);
            $('.news-left>span').eq(0).html(timers);
            $('.news-left>h3').html(deta.title);
            $('.ddr').html(deta.chNotice);
            objs.html(txt);
        }
    })
}
$('#page').on('click',function () {
    if(news<=1){
        return false
    }else{
        news--;
        getNew(news,1,$('#news1'));
    }
});
$('#next').on('click',function () {
    if(news>=newsLen){
        return false
    }else{
        news++;
        getNew(news,1,$('#news1'));
    }
});
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