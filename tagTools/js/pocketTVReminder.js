/***
*	当前版本：0.0.1
*	实现功能：获取Bilibili直播间小电视抽奖的信息，并有声音提示
*	下个版本即将添加：
*	领瓜子功能
***/

avascript:void(
function(){
	/**自动运行程序|
	 **检查网页是否是直播间（检测聊天区域的ID是否能get）
	 **非直播间则跳出程序
	**/
	if(document.getElementById("chat-msg-list")){
		//当前网页为bilibili直播间，可继续运行程序
		console.log("感谢使用小电视插件❤静静等候小电视的到来吧~");
		
		/**初始化&通用变量设置**/
		var timer=null;//计时器
		var messageContainer=document.getElementById("chat-msg-list");
		var n=messageContainer.getElementsByClassName("small-tv-msg").length;//初始小电视信息框数量
		//console.log("初始信息数量："+n);//现有系统信息数量
		addAuthorLink();

		/**计时器|每次检测信息框数量>原数量，发出提醒**/
		timer=setInterval(function(){
			var curr=getCurrMessage();
			//console.log("您已进入倒计时，当前信息数量："+curr+"，初始应信息数量为"+n);
			if(curr>n){
				console.log("有新消息");
				addAudio();
				n=curr;
			}
		},30000);


	}else{
		//当前网页非bilibili直播间，退出程序
		console.log("当前页面不能使用本书签");
		return;
	}

	//移除并添加提示音
	function addAudio(){
		if(document.getElementById("bubbleAudio")){
			document.getElementsByTagName("body")[0].removeChild(document.getElementById("bubbleAudio"));
		}
		var audio=document.createElement("audio");
		audio.autoplay="autoplay";
		audio.id="bubbleAudio";
		var source=document.createElement("source");
		source.src="http://localhost:8090/tagTools/audio/bubble.mp3";
		audio.appendChild(source);
		var source=document.createElement("source");
		source.src="http://localhost:8090/tagTools/audio/bubble.wav";
		audio.appendChild(source);
		document.getElementsByTagName("body")[0].appendChild(audio);
	}

	//获取当前消息数量
	function getCurrMessage(){
		return document.getElementById("chat-msg-list").getElementsByClassName("small-tv-msg").length;
	}
	
	//给作者投喂瓜子www
	function addAuthorLink(){
		var div=document.createElement("div");
		div.setAttribute("style","width:15px;height:15px;background:#A3FF7F;border:1px solid #6DF258;border-radius:3px;display:inline-block;position:absolute;top:1px;left:100px");
		div.title="给作者投喂瓜子~";
		var a=document.createElement("a");
		a.href="//live.bilibili.com/31976";
		a.target="_blank";
		a.setAttribute("style","font-size:12px;text-decoration:none;color:#fff;position:absolute;top:-1px;left:1px")
		a.innerText="喂";
		div.appendChild(a);
		var parentNode=document.getElementById("profile-ctrl");
		parentNode.insertBefore(div,parentNode.getElementsByTagName("a")[0]);
	}
}
)();