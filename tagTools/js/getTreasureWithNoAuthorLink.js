/**
*	当前版本：0.0.1
*	实现功能：获取Bilibili直播间，领取银瓜子
**/
/**
*	步骤：
*	1.获取播放器节点，id="player-containers"
*	2.实时监控倒计时countDown.innerHTML=="00:00"
*	3.
*	X.领取完成后取消定时器
*
*	需要的变量：
*		·countDown：#play-container->第一个div->第一个div->第三个div，用于获取倒计时，实时获取
*		·closeBtn：inputPanel.parentNode.parentNode.parentNode.firstChild/第一个div，领取完成后关闭按钮（？？？貌似会自动关闭，可不使用）
*		·acquiringPanel：inputBox的父节点
*		·silverSeeds：acquiringPanel下的span 领取的银瓜子数
*		·inputPanel：#play-container下的input（唯一）
*		·calculateImg：acquiringPanel下的img
*		·refreshBtn：acquiringPanel下的a
*		·submitBtn：acquiringPanel下的button
*
*	节点树：
*	播放器节点#play-container
*		·宝箱面板 boxPanelContainer
*			·宝箱节点
*				·宝箱图标（第二个div boxImg 用于点击显示面板，刷新算数img）
*				·倒计时显示（第三个div，countDown）
*			·面板节点
*				·tip-content
*					·close-btn（第一个div）
*					·等待面板（第三个div）
*						·...（目前不用）
*					·领取面板（第四个div）
*						·dp-i-block（大概是容器的div）
*							·div 文字容器
*								*span 本次领取银瓜子数
*							·input (整个节点唯一的一个input!）
*							·img 算数题
*							·a 刷新
*							·button 领取
*		·播放器装饰节点
*			...
**/
javascript:void(
function(){
	/**自动运行**/
	if(document.getElementById("player-container")){
		//bilibili直播间页面
		console.log("自动领取银瓜子中...");
		
		//初始化 | 通用变量
		var timer=null;//定时器
		var boxPanelContainer=document.getElementById("player-container").getElementsByTagName("div")[0];//宝箱面板总结点
		var boxImg=boxPanelContainer.getElementsByTagName("div")[0].getElementsByTagName("div")[1];//宝箱图标节点，用于点击
		var panel=boxPanelContainer.getElementsByTagName("div")[1];//面板总结点，用于判断是否需要关闭面板
		var countDown=boxPanelContainer.getElementsByTagName("div")[0].getElementsByTagName("div")[2];//倒计时节点
		var inputPanel=boxPanelContainer.getElementsByTagName("input")[0];//输入框
		var acquiringPanel=inputPanel.parentNode;//领取面板中输入框的直接容器
		var acquiringParentPanel=acquiringPanel.parentNode;//领取面板，用于判断是否全部领取完成
		var closeBtn=acquiringParentPanel.parentNode.getElementsByTagName("div")[0];//关闭面板按钮
		var refreshBtn=acquiringPanel.getElementsByTagName("a")[0];//刷新按键
		var submitBtn=acquiringPanel.getElementsByTagName("button")[0];//领取按键

		timer=setInterval(function(){
			if(isFinishCountDown()){
				//倒计时完成
				boxImg.click();//点击打开领取界面
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
		//判断倒计时完成之后宝箱面板总结点的display是否为none
		return boxPanelContainer.display=="none";
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
