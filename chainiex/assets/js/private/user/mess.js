$('.wrap-dh h5').each(function () {
    $(this).on('click',function () {
        if($(this).next().height()==0){
            $(this).next().animate({height:($(this).next().find('li').length*50)+'px'},200)
        }else{
            $(this).next().animate({height:'0px'},200)
        }
    })
})
var arr = [];
$('#checks').on('click',function () {
    arr = [];
    if($(this).attr('data-status')==0){
        $('.checks').each(function () {
            $(this).prop('checked','true');
            arr.push($(this).attr('data-id'))
        })
        $(this).attr('data-status',1);
    }else{
        $('.checks').each(function () {
            $(this).prop('checked',false);
        })
        arr =[];
        $(this).attr('data-status',0);
    }

});
$('#messLis').on('click','.checks',function () {
    var stu =0;
    arr =[];
    $('.checks').each(function () {
        if($(this).is(':checked')){
            arr.push($(this).attr('data-id'))
        }else{
            stu =1;
        }
    })
    if(stu==0){
        $('#checks').prop('checked',true);
        $('#checks').attr('data-status',1);
    }else{
        $('#checks').prop('checked',false);
        $('#checks').attr('data-status',0);
    }
})

$('.deletes').on('click',function () {
    $('.ycdel').css('display','block')
})
$('.no').on('click',function () {
    $('.ycdel').css('display','none')
})
$('.yes').on('click',function () {
    $('.checks').each(function () {
        if($(this).is(':checked')){

        }
    })
    $('.ycdel').css('display','none')
})
var columns=[{
    "mData" : "id",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "10%",
    "render" : function (data,type,full) {
        var txt = '<label><input type="checkbox"  class="checks" data-id="'+data+'">'+$("#errorMess").attr("data-xt")+'</label>';
        return txt
    }
},{
    "mData" : "content",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "10%",
    "render":function (data,type,full) {
        if(full.status==1){
            return '<div class="chanStatus" data-id="'+full.id+'">'+data+'<span style="float: right">'+obj.formTime(full.gmtCreate)+'</span></div>'
        }else {
            return '<div data-id="'+full.id+'">'+data+'<span style="float: right">'+obj.formTime(full.gmtCreate)+'</span></div>'
        }

    }
},{
    "mData" : "id",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "10%",
    "render":function (data,type,full) {
        var txt = '<svg class="icon delete" aria-hidden="true" data-id="'+data+'">'+
            '<use xlink:href="#icon-cuohao"></use>'+
            '</svg>';
        return txt
    }
}];
var obj = obje();
var tab = obj.datatable($('#table'),'/message/list?status=1',columns,obj.eachJson,"get",posi,[5],5);
obj.menu()
function posi() {
    if($('.wrap-right').height()+180>$('.footer').offset().top||$('.wrap-right').height()>=$(window).height()-276){
        $('.footer').css('position','relative')
    }else{
        $('.footer').css('position','fixed')
    };
}
$('#messLis').on('click','.delete',function () {
    var objs={};
    objs[$('#csrf').attr('name')]=$('#csrf').val();
    objs.ids=[$(this).attr('data-id')];
    $.ajax({
        url:'/message/delete',
        type:'post',
        data:objs,
        dataType:'json',
        success:function (obj) {
            if(obj.code ==0){
               reload();
            }else{
                alert($('#errorMess').attr('data-lx'))
            }
        }
    })
})
$('.type').find('li').each(function () {
    $(this).on('click',function () {
        $('.paging_simple_numbers').css('display','none');
        $(this).addClass('typeLi').siblings().removeClass('typeLi');
        tab.api().ajax.url('/message/list?type='+$(this).attr('data-type')+'&status='+$(this).attr('data-status')).load(function (res) {
            if($('.wrap-right').height()+180>$('.footer').offset().top||$('.wrap-right').height()>=$(window).height()-276){
                $('.footer').css('position','relative')
            }else{
                $('.footer').css('position','fixed')
            }
            if(res.data.page.totalResults>5){
                $('.paging_simple_numbers').css('display','block');
            }

        });
        $('#checks').attr('data-status','0');
        $('#checks').prop('checked',false);
    })

})
$('.yes').on('click',function () {
    var objs={};
    objs[$('#csrf').attr('name')]=$('#csrf').val();
    objs.ids=arr;
    $.ajax({
        url:'/message/delete',
        type:'post',
        data:objs,
        dataType:'json',
        success:function (obj) {

            if(obj.code ==0){
                reload()
                $('#checks').attr('data-status','0');
                $('#checks').prop('checked',false);
            }else{
                alert($('#errorMess').attr('data-lx'));
                $('#checks').attr('data-status','0');
                $('#checks').prop('checked',false);

            }
        }
    })
})
function reload() {
    tab.api().ajax.reload();
    if($('.wrap-right').height()+180>$('.footer').offset().top||$('.wrap-right').height()>=$(window).height()-276){
        $('.footer').css('position','relative')
    }else{
        $('.footer').css('position','fixed')
    }
}
$('#messLis').on('click','.chanStatus',function () {
    var objs={};
    objs[$('#csrf').attr('name')]=$('#csrf').val();
    objs.ids=[$(this).attr('data-id')];
    $.ajax({
        url:'/message/read',
        type:'post',
        dataType:'json',
        data:objs,
        success:function (obj) {
            if(obj.code==0){

            }
        }

    })
})
$('.header-top>div>ul>li').eq(0).find('span').removeClass('headerClass')
$('.header-top>div>ul>li').eq(5).find('span').addClass('headerClass');