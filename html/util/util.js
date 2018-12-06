window.roads = (function(win, r) {
		// 是否Debug模式
		r.G_DEBUG_MODE = true;

		r.G_BASE_SALE_URL = "html/sale/";
		r.G_BASE_PROCURE_URL = "html/procure/";
		r.G_BASE_LOGIN_URL = "html/login/";
		r.G_BASE_MENU_URL = "html/menu/";
		r.G_BASE_UTIL_URL = "html/util/";

		/**
		 * 跨页面传值
		 * @param {String} winid
		 * @param {String} func
		 * @param {Object} params 传递的参数
		 */
		r.execScript = function(winid, func, params) {
				var paramStr = typeof params == "String" ? params : JSON.stringify(params);
				summer.execScript({
						winId : winid,
						script : func + '(' + paramStr + ');'
				});
		};

		/*土味AJAX*/
		r.oldSkoolAjax = function(url, data, successCallback) {
				// 判断网络
				if (!summer.netAvailable()) {
						summer.refreshHeaderLoadDone();
						summer.refreshFooterLoadDone();
						summer.toast({
								msg : "网络异常，请检查网络"
						});
						return false;
				}

				$.ajax({
						url : url,
						type : "POST",
						dataType : "xml",
						contentType : "text/xml; charset=utf-8",
						data : data,
						timeout : 8000,
						beforeSend : function(xhr) {
								xhr.setRequestHeader("User-Agent", "headertest");
						},
						success : function(ret) {
								summer.refreshHeaderLoadDone();
								summer.refreshFooterLoadDone();
								successCallback(ret);
						},
						error : function(err) {
								summer.refreshHeaderLoadDone();
								summer.refreshFooterLoadDone();
								alert("与服务器连接失败，请检查网络连接");
						},
						complete : function(XMLHttpRequest, status) {
								if (status == 'timeout')
										alert("抱歉，请求超时，请重试");
						}
				});
		};

		//打开窗口
		r.openWin = function(module, winid, win_url, pageParam) {
				var baseUrl = "";
				switch (module) {
				case "sale" :
						baseUrl = r.G_BASE_SALE_URL;
						break;
				case "procure" :
						baseUrl = r.G_BASE_PROCURE_URL;
						break;
				case "login" :
						baseUrl = r.G_BASE_LOGIN_URL;
						break;
				case "menu" :
						baseUrl = r.G_BASE_MENU_URL;
						break;
				case "util" :
						baseUrl = r.G_BASE_UTIL_URL;
						break;
				}
				summer.openWin({
						id : winid,
						url : baseUrl + win_url,
						pageParam : pageParam
				});
		};

		// 监听打开窗口
		r.openWinSpecial = function(module, winid, win_url, pageParam) {
				var baseUrl = "";
				switch (module) {
				case "sale" :
						baseUrl = r.G_BASE_SALE_URL;
						break;
				case "procure" :
						baseUrl = r.G_BASE_PROCURE_URL;
						break;
				case "login" :
						baseUrl = r.G_BASE_LOGIN_URL;
						break;
				case "menu" :
						baseUrl = r.G_BASE_MENU_URL;
						break;
				case "util" :
						baseUrl = r.G_BASE_UTIL_URL;
						break;
				}
				summer.openWin({
						id : winid,
						url : baseUrl + win_url,
						pageParam : pageParam,
						"addBackListener" : "true"
				});
		};

		r.initializeWin = function(winid, module, win_url, toId) {
				var baseUrl = "";
				switch (module) {
				case "sale" :
						baseUrl = r.G_BASE_SALE_URL;
						break;
				case "procure" :
						baseUrl = r.G_BASE_PROCURE_URL;
						break;
				case "login" :
						baseUrl = r.G_BASE_LOGIN_URL;
						break;
				case "menu" :
						baseUrl = r.G_BASE_MENU_URL;
						break;
				case "util" :
						baseUrl = r.G_BASE_UTIL_URL;
						break;
				}
				summer.initializeWin({
						id : winid,
						url : baseUrl + win_url,
						toId : toId
				});
		};

		// 关闭窗口
		r.closeWin = function() {
				summer.closeWin();
		};

		// 关闭窗口并执行
		r.closeWinExec = function(winid, func, params) {

				var paramStr = typeof params == "String" ? params : JSON.stringify(params);
				summer.execScript({
						winId : winid,
						script : func + '(' + params + ');'
				});
				summer.closeWin();
		};

		// 关闭窗口确认
		r.confirmClose = function() {
				UM.confirm({
						title : "确认要离开吗",
						text : "数据没保存或提交,将不会保存",
						btnText : ["取消", "确定"],
						overlay : true,
						duration : 2000,
						cancle : function() {
						},
						ok : function(data) {
								summer.closeWin();
						}
				});
		};

		// 关闭窗口确认
		r.closetoWinExec = function(winId, func, params) {
				if (params != "") {
						var paramStr = typeof params == "String" ? params : JSON.stringify(params);
						summer.execScript({
								winId : winid,
								script : func + '(' + paramStr + ');'
						});
				}
				summer.closeToWin({
						id : winId,
						animation : {
								type : "fade", //动画类型（详见动画类型常量）
								subType : "from_right", //动画子类型（详见动画子类型常量）
								duration : 300 //动画过渡时间，默认300毫秒
						}
				});
		};

		// 退出应用确认
		r.confirmExit = function() {
				UM.confirm({
						title : "确认退出系统",
						text : "之后进入系统需要重新验证登录",
						btnText : ["取消", "确定"],
						overlay : true,
						duration : 2000,
						cancle : function() {
						},
						ok : function(data) {
								summer.setStorage('loginStatus', 0);
								var t = setTimeout(function() {
										var params = ["android.permission.READ_EXTERNAL_STORAGE", "android.permission.WRITE_EXTERNAL_STORAGE", "android.permission.READ_PHONE_STATE"];
										summer.getPermission(params, function(args) {
												clearTimeout(t);
												summer.exitApp();
										}, function(args) {
												alert(args);
										});
								}, 2000);
						}
				});
		};

		// 关闭窗口确认并执行
		r.confirmClosenExec = function(winid, func, params) {
				var paramStr = typeof params == "String" ? params : JSON.stringify(params);
				UM.confirm({
						title : "确认要离开吗",
						text : "数据没保存或提交,将不会保存",
						btnText : ["取消", "确定"],
						overlay : true,
						duration : 2000,
						cancle : function() {
						},
						ok : function(data) {
								summer.execScript({
										winId : winid,
										script : func + '(' + params + ');'
								});
								summer.closeWin();
						}
				});
		};

		// 日志输出
		r.log = function(msg) {
				if (r.G_DEBUG_MODE) {
						console.log(msg);
				}
		};

		//震动
		r.vibrator = function(duration) {
				var params = ["android.permission.VIBRATE"];
				summer.getPermission(params, function(args) {
						navigator.vibrate(duration);
				}, function(args) {
						alert(args);
				});
		};

		//语音
		r.speech = function(content) {
				var audioHost = document.getElementById('audioHost');
				var audioCode = document.getElementById('audioCode');
				audioHost.removeChild(audioCode);
				audioHost.innerHTML = '<audio id="audioCode"><source id="tts_source_id" src="http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=6&pit=7&vol=8&text=' + content + '" type="audio/mpeg"><embed id="tts_embed_id" height="0" width="0" src=""></audio>';
				var audioCode = document.getElementById('audioCode');
				audioCode.play();
		};

		return r;
})(window, window.roads || {})