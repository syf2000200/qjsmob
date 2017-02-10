/**
 * loadMask 添加遮罩层
 */
function loadMask() {
  $('<div id="gLoadingMask" class="h-mask-container"><div class="h-mask-gif"></div></div>').appendTo('body');
  $('#gLoadingMask').css('display', 'block');
}
/**
 * removeMask 移除遮罩层
 */
function removeMask() {
  $('#gLoadingMask').remove();
}
/**
 * 下拉导航
 */
function toggleKey(){
    if(document.getElementById('navcl').style.display=='block'){
        document.getElementById('navcl').style.display='none';
    }else{
        document.getElementById('navcl').style.display='block';
    }
}
/**
 * 弹出提示信息
 */
function showmsg(msg)
{

    if ($('#maskBox').length > 0)
    {
        $('#maskBox').remove();
    }
    var html = '<div id="maskBox"><div id="gLoadingMask" class="h-mask-container"></div><div class="mask-alert"><p class="cue">'+msg+'</p><button id="msgbtn" class="btn-white">取消</button></div></div>';
    $(html).appendTo($(document.body));
    $('#gLoadingMask').css('display', 'block');

    $('#msgbtn').tap(function(){
        $('#maskBox').remove();
    });
}
/**
 * 千分位转换
 */
Number.prototype.formatMoney = function (places, symbol, thousand) {
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : "$";
    thousand = thousand || ",";
    // decimal = decimal || ".";
    var number = this,
        negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand);
};



function validateIdCard(idCard){
 //15位和18位身份证号码的正则表达式
 var regIdCard=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
 //回调信息
 var msg='';
 var result = true;
 //如果通过该验证，说明身份证格式正确，但准确性还需计算
 if(regIdCard.test(idCard)){
  if(idCard.length==18){
   var idCardWi=new Array( 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ); //将前17位加权因子保存在数组里
   var idCardY=new Array( 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
   var idCardWiSum=0; //用来保存前17位各自乖以加权因子后的总和
   for(var i=0;i<17;i++){
    idCardWiSum+=idCard.substring(i,i+1)*idCardWi[i];
   }
   var idCardMod=idCardWiSum%11;//计算出校验码所在数组的位置
   var idCardLast=idCard.substring(17);//得到最后一位身份证号码
   //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
   if(idCardMod==2){
    if(idCardLast=="X"||idCardLast=="x"){
     msg = "恭喜通过验证啦！";
    }else{
     msg="身份证号码错误！";
	 result = false;
    }
   }else{
    //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
    if(idCardLast==idCardY[idCardMod]){
     msg = "恭喜通过验证啦！";
    }else{
     msg="身份证号码错误！";
	 result = false;
    }
   }
  } 
 }else{
  msg = "身份证格式不正确!";
  result = false;
 }
 
 return new Array(result,msg);
}



$(function(){
	var headerHeight = $(".header").height();
	var footerHeight = $(".h-foot").height();
	if($('.main-section').length>0){
		$('.main-section').css('min-height',($(window).height()-headerHeight-footerHeight)+"px");
	}
});

//Description:  银行卡号Luhm校验
 
//Luhm校验规则：16位银行卡号（19位通用）:
 
// 1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
// 2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
// 3.将加法和加上校验位能被 10 整除。
 
//方法步骤很清晰，易理解，需要在页面引用Jquery.js    
//bankno为银行卡号 banknoInfo为显示提示信息的DIV或其他控件
function luhmCheck(bankno){
    var lastNum=bankno.substr(bankno.length-1,1);//取出最后一位（与luhm进行比较）
 
    var first15Num=bankno.substr(0,bankno.length-1);//前15或18位
    var newArr=new Array();
    for(var i=first15Num.length-1;i>-1;i--){    //前15或18位倒序存进数组
        newArr.push(first15Num.substr(i,1));
    }
    var arrJiShu=new Array();  //奇数位*2的积 <9
    var arrJiShu2=new Array(); //奇数位*2的积 >9
     
    var arrOuShu=new Array();  //偶数位数组
    for(var j=0;j<newArr.length;j++){
        if((j+1)%2==1){//奇数位
            if(parseInt(newArr[j])*2<9)
            arrJiShu.push(parseInt(newArr[j])*2);
            else
            arrJiShu2.push(parseInt(newArr[j])*2);
        }
        else //偶数位
        arrOuShu.push(newArr[j]);
    }
     
    var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
    var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
    for(var h=0;h<arrJiShu2.length;h++){
        jishu_child1.push(parseInt(arrJiShu2[h])%10);
        jishu_child2.push(parseInt(arrJiShu2[h])/10);
    }        
     
    var sumJiShu=0; //奇数位*2 < 9 的数组之和
    var sumOuShu=0; //偶数位数组之和
    var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
    var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal=0;
    for(var m=0;m<arrJiShu.length;m++){
        sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
    }
     
    for(var n=0;n<arrOuShu.length;n++){
        sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
    }
     
    for(var p=0;p<jishu_child1.length;p++){
        sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
        sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
    }      
    //计算总和
    sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);
     
    //计算Luhm值
    var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;        
    var luhm= 10-k;
     
    if(lastNum==luhm){
    msg ="银行卡号验证通过";
    result = true;
    }
    else{
     msg ="无效的银行卡号";
     result = false;
    }  
	return new Array(result,msg);
}


