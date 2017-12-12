var obj = new obje();
obj.menu();
//公告
var k=1;
var boor=true;
$.ajax({
    url:'/notice/list',
    type:'get',
    dataType:'json',
    data:{
        current:k,
        pageSize:6
    },
    success:function (req) {
        var txt ="";
        for(var i=0;i<req.data.notices.length;i++){
            txt +='<li><a href="/help/details?id='+req.data.notices[i].id+'">'+req.data.notices[i].title+'<span>'+obj.formTime(req.data.notices[i].gmtCreate)+'</span></a></li>'
        }
        $('#noticelist').html(txt);
        if(req.data.notices.length==10){
            k++;
            $('#ckgd').css('display','block')
        }else{
            boor=false;
        }
    }
});
$('#ckgd').on('click',function () {
    if(boor){
        $.ajax({
            url:'/notice/list',
            type:'get',
            dataType:'json',
            data:{
                current:k,
                pageSize:6
            },
            success:function (req) {
                var txt ="";
                for(var i=0;i<req.data.notices.length;i++){
                    txt +='<li><a href="/help/details?id='+req.data.notices[i].id+'">'+req.data.notices[i].title+'<span>'+obj.formTime(req.data.notices[i].gmtCreate)+'</span></a></li>'
                }
                $('#noticelist').html(txt);
                if(req.data.notices.length==10){
                    k++
                }else{
                    boor=false;
                }
            }
        });
    }else{
        alert('没有更多公告了')
    }
})