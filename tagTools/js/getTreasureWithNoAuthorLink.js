/**
*	当前版本：1.0.1
*	实现功能：B站改版，节点树更清晰
**/
/**
*	步骤：
*	1.获取播放器节点，id="gift-control-vms"
*	2.实时监控倒计时countDown.innerHTML=="00:00"
*	3.
*	X.领取完成后取消定时器
**/
javascript:void(
function(){
	/**自动运行**/
	if(document.getElementById("gift-control-vm")){
		//bilibili直播间页面
		console.log("自动领取银瓜子中...");
		
		//初始化 | 通用变量
		var timer=null;//定时器
		var giftControlVm=document.getElementById("gift-control-vm");//礼物、宝箱总节点√
		var boxPanelContainer=giftControlVm.getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[0];//宝箱面板总结点
		console.log(boxPanelContainer);
		//var boxImg=boxPanelContainer.getElementsByTagName("div")[0];//宝箱图标节点，用于点击（可省略？
		var panel=boxPanelContainer.getElementsByTagName("div")[2];//领瓜子面板总结点，用于判断是否需要关闭面板
		console.log(panel);
		var countDown=boxPanelContainer.getElementsByTagName("div")[1];//倒计时节点
		console.log(countDown);
		var inputPanel=panel.getElementsByTagName("div")[1].getElementsByTagName("input")[0];//输入框
		var acquiringPanel=inputPanel.parentNode;//领取面板中输入框的直接容器
		//var acquiringParentPanel=acquiringPanel.parentNode;//领取面板，用于判断是否全部领取完成
		var closeBtn=panel.getElementsByTagName("button")[0];//关闭面板按钮
		var refreshBtn=acquiringPanel.getElementsByTagName("button")[0];//刷新按键
		var submitBtn=panel.getElementsByTagName("div")[2].getElementsByTagName("div")[2].getElementsByTagName("button")[3];//领取按键


		timer=setInterval(function(){
			if(isFinishCountDown()){
				//倒计时完成
				//boxImg.click();//点击打开领取界面
				if(isFinishGettingSilver()){
					//当天银瓜子已领完时
					closeBtn.click();
					console.log("今日已完成领取啦~");
					timer=null;
				}else{
					refreshBtn.click();//刷新图片，减少计时
					var result=OCRImage();//图片识别
					inputPanel.value=result;
					submitBtn.click();
				}
			}else{
				if(panel.display=="block"){
					closeBtn.click();
				}
			}
		},5000);
	}else{
		//非bilibili直播间页面
		console.log("当前页面没有银瓜子可领╮(╯▽╰)╭");
	}

	//倒计时是否完成
	function isFinishCountDown(){
		return countDown.innerHTML=="00:00";
	}

	//是否有剩余瓜子可领
	function isFinishGettingSilver(){
		//判断文字吧还是
		//return boxPanelContainer.display=="none";
	}

	//获取图片并转换为字符串后计算
	function OCRImage(){
		var calculateImg=new Image();
		calculateImg.src=acquiringPanel.getElementsByTagName("img")[0].src;
		var calStr=OCRAD(calculateImg);
		return strToNum(calStr);
	}

	//字符串数字化并计算
	function strToNum(str){
		//0:0oO
		//1:1l
		//2:2zZ
		//3:3
		//4:4_
		//5:5
		//6:6S
		//7:7
		//8:8sB
		//9:9g
		var str=str.replace(/[0oO]/g,"0").replace(/[1Il]/g,"1").replace(/[2zZ]/g,"2").replace(/3/g,"3").replace(/[4_]/g,"4").replace(/5/g,"5").replace(/[6S]/g,"6").replace(/7/g,"7").replace(/[8sB]/g,"8").replace(/[9g]/g,"9").replace(/[^+-0oO1Il2zZ34_56S78sB9g]/g,"");
		return eval(str);
	}
}
)();
