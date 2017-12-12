var obj = new obje();
obj.menu();
var url = obj.getUrl();


$('.wrap-right').on('click','.head',function () {
    if($(this).attr('data-status')==0){
        $(this).attr('data-status',1);
        $(this).addClass('dk');
        $(this).find('use').attr('xlink:href','#icon-iconjian');
        $(this).next().removeClass('hide');
    }else{
        $(this).attr('data-status',0);
        $(this).next().addClass('hide');
        $(this).removeClass('dk');
        $(this).find('use').attr('xlink:href','#icon-jiahao');
    }
})
var p=0;
$(window).scroll(function () {
    p=0
    $('#ulss>h5').each(function () {
        if($(this).offset().top-75<$(document).scrollTop()){
            p++;
        }
    })
    if(p!=0){
        $('#uls').find('li').eq(p-1).addClass('ads').siblings().removeClass('ads')
    }
})
$('#uls').find('li').each(function () {
    $(this).on('click',function () {
        $('body').animate({scrollTop:$('#ulss>h5').eq($(this).index()).offset().top-65},200);
        $(this).addClass('ads').siblings().removeClass('ads');
    })
})
if(url){
    $('#uls>li').eq(url.id-1).addClass('ads').siblings().removeClass('ads');
    $(document).scrollTop($('#ulss>h5').eq(url.id-1).offset().top-75)
}