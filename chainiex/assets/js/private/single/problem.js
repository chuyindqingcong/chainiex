var obj = new obje();
obj.menu()
$('.color').on('click',function () {
   if($(this).attr('data-status')==0){
       $(this).css('height',$(this).attr('data-height')+'px');
       $(this).attr('data-status','1');
       $(this).find('.ppd').css('transform','rotate(180deg)')
   }else{
       $(this).css('height','60px');
       $(this).attr('data-status',0);
       $(this).find('img').css('transform','rotate(0deg)')
   }
   $(this).siblings().css({'height':'60px'}).attr('data-status',0);
   $(this).siblings().find('.ppd').css('transform','rotate(0deg)')
})