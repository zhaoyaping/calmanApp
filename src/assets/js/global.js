const host = 'http://jtrznjk.com:10768/index.php/API/';
export default {
	host,
	myAlert(str,click){               //创建自定义弹框
    			var overflow="";
    			var $hidder=null;
    			var clickHandler=click||$.noop;
    			var myClickHandler=function(){
        			$hidder.remove();
        			$("body").css("overflow",overflow);
        			clickHandler($(this).html()=="确定");
    			};
    			var init=function(){
        		$hidder = $("<div style='width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:1000;text-align: center;position:fixed;left:0;top:0;'></div>");         //遮罩层
        		var $myalert = $("<div style='width:70%;position:absolute;top:30%;left:10%;padding:20px;background:#fff;border-radius:10px;'>"+"<div style='border-bottom:1px solid #e5e5e5;padding-bottom:5px;font-size:20px;color:green;'>温馨提示</div></div>").appendTo($hidder);                            //标题
        		$("<div style='padding:5px 0;line-height:40px;color:#333;border-bottom:1px solid #e5e5e5;'>"+str+"</div>").appendTo($myalert);                                      //提示内容
        		var $myalert_btn_div = $("<div style='padding-top:10px;'></div>").appendTo($myalert);
        		var $okBtn = $("<div style='margin:0 auto;width:80%;background-color:green;color:white;border-radius:5px;padding:7px 0;box-sizing:border-box;' class='bluebg1'>确定</div>").appendTo($myalert_btn_div).click(myClickHandler);  //确定按钮
        		overflow=$("body").css("overflow");
        		$("body").css("overflow","hidden").append($hidder);
    			};
    			init();
			}
}
//http://localhost/http://calman.jctmj.net/index.phphttp://10.168.3.253/index.php