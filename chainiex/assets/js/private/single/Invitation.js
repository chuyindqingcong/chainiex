var obj = obje()
$('body').on('click','#copy',function () {
    try{
        var Url2=document.getElementById("aa");
        Url2.select();
        document.execCommand("Copy");
        alert("已复制好，可贴粘。");
    }catch (err){
        alert("复制失败，请手动复制。");
    }
});
$('.container .icon').on('click',function () {
    $('.czjm').css('display','none')
})
$('.czbg').on('click',function () {
    $('.czjm').css('display','none')
})
$('.sh').on('click',function () {
    $('.czjm').css('display','block')
})