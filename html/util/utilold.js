window.roads = (function(win, r) {
	
	// 是否Debug模式
	r.G_DEBUG_MODE = true;
	// base url
	r.G_COMMON_URL = "http://172.16.14.232/uapws/service/nc.itf.app.webservice.AppWebService/";
	
	// 刷新显示文本
	r.G_TEXT_DOWN = "放手啊，不想刷新别拉我(｡•ˇ‸ˇ•｡)";
	r.G_TEXT_UP = "够了啊，我赶着刷新呢(｡•ˇ‸ˇ•｡)";
	r.G_TEXT_DO = "别急，马上就好(｡•ˇ‸ˇ•｡)";

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
	    	winId: winid,
	    	script: func+'('+paramStr+');'
	    });
	};
	
	/*土味AJAX*/
	r.oldSkoolAjax=function(url, data, successCallback) {
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
			complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
	　　　　if(status=='timeout'){
	　　　　　  alert("抱歉，请求超时，请重试");
	　　　　}
　　		}
		});
	}
	
	/**
	 * 网络请求封装
	 * @param {Object} paramObj
	 * @param {String} successCallback
	 * @param {String} errorCallback
	 */
	r.ajaxRequest = function(paramObj, successCallback, errorCallback) {
		// 判断网络
		if (!summer.netAvailable()) {
			summer.refreshHeaderLoadDone();
			summer.refreshFooterLoadDone();
			summer.toast({
				msg : "网络异常，请检查网络"
			});
			return false;
		}
		var requestPath = "http://172.16.14.232/uapws/service/nc.itf.app.webservice.AppWebService/getCarNO";
		

		var header;
		if (paramObj.contentType) {
			header["Content-Type"] = paramObj.contentType;
		}

		// 设置超时
		window.cordovaHTTP.settings = {
			timeout : paramObj.timeout || 30000
		};
		summer.ajax({
			type : "post",
			url : "http://172.16.14.232/uapws/service/nc.itf.app.webservice.AppWebService/getCarNO",
			param : {
						"cardNo" : "2748481012"
				},
			// 考虑接口安全，每个请求都需要将这个公告header带过去
			header : ""
		}, function(ret) {
			summer.refreshHeaderLoadDone();
			summer.refreshFooterLoadDone();
			var data;
			if ($summer.isJSONObject(ret.data)) {
				data = ret.data;
			} else {
				data = JSON.parse(ret.data);
			}
			successCallback(data);
		}, function(err) {
			summer.refreshHeaderLoadDone();
			summer.refreshFooterLoadDone();
			//var tokenerror = summer.getStorage("G-TOKEN-ERROR");
			// 避免过快点击到其它页面出现连续跳转到登录页面的现象
			errorCallback(err);
			// 执行自己的错误其它逻辑
		});
	}
	
	// 文件上传
	r.fileUpload = function(paramObj, successCallback, errorCallback) {
		// 判断网络
		if (!summer.netAvailable()) {
			summer.refreshHeaderLoadDone();
			summer.refreshFooterLoadDone();
			summer.toast({
				msg : "网络异常，请检查网络"
			});
			return false;
		}
		// 文件上传地址
		var requestPath = r.G_COMMON_URL + paramObj.url;
		summer.multiUpload({
			fileArray : paramObj.fileArray,
			params : paramObj.params,
			headers : "",
			SERVER : requestPath
		}, function(ret) {
			summer.refreshHeaderLoadDone();
			summer.refreshFooterLoadDone();
			successCallback(ret);
		}, function(err) {
			summer.refreshHeaderLoadDone();
			summer.refreshFooterLoadDone();
			errorCallback(err);
			// 执行自己的错误其它逻辑
		});
	};
	
	// 下拉刷新
    r.setRefreshHeaderInfo = function(callback){
        summer.setRefreshHeaderInfo({
            visible: true,
            textColor: '#4d4d4d',
            textDown: r.G_TEXT_DOWN,
            textUp: r.G_TEXT_UP,
            textDo: r.G_TEXT_DO,
            showTime: false,
            style: "moli"
        }, callback);
    }

    // 上拉刷新
    r.setRefreshFooterInfo = function(callback){
        summer.setRefreshFooterInfo({
            visible: true,
            textColor: '#4d4d4d',
            textDown: r.G_TEXT_DOWN,
            textUp: r.G_TEXT_UP,
            textDo: r.G_TEXT_DO,
            showTime: false,
            style: "moli"
        }, callback);
    }
    
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
			id: winid,
			url:  baseUrl + win_url,
			pageParam: pageParam
		});
	}
	
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
			id: winid,
			url:  baseUrl + win_url,
			pageParam: pageParam,
    		"addBackListener":"true"
		});
	}
    
	// 关闭窗口
	r.closeWin = function() {
		summer.closeWin();
	}
	
		// 关闭窗口并执行
	r.closeWinExec = function(winid, func, params) {
		
		var paramStr = typeof params == "String" ? params : JSON.stringify(params);
		summer.execScript({
		    	winId: winid,
		    	script: func+'('+params+');'
		    });
		 summer.closeWin();
	}
	
	// 关闭窗口确认
	r.confirmClose = function() {
		  UM.confirm({
		    title: "确认要离开吗",
		    text: "数据没保存或提交,将不会保存",
		    btnText: ["取消", "确定"],
		    overlay: true,
		    duration:2000,
		    cancle: function() {},
		    ok: function(data) {
		     summer.closeWin();
		    }
		}); 
	}
	
	// 退出应用确认
	r.confirmExit = function() {
		  UM.confirm({
		    title: "确认退出系统",
		    text: "之后进入系统需要重新验证登录",
		    btnText: ["取消", "确定"],
		    overlay: true,
		    duration:2000,
		    cancle: function() {},
		    ok: function(data) {
		 			summer.setStorage('loginStatus', 0);
		 			var t=setTimeout(function(){
		 				var params = ["android.permission.READ_EXTERNAL_STORAGE", "android.permission.WRITE_EXTERNAL_STORAGE", "android.permission.READ_PHONE_STATE"];
						summer.getPermission(params, function(args) {
								clearTimeout(t);
								summer.exitApp();
						}, function(args) {
								alert(args);
						});	
					},2000);
		    }
		}); 
	}
	
	// 关闭窗口确认并执行
	r.confirmClosenExec = function(winid, func, params) {
		 var paramStr = typeof params == "String" ? params : JSON.stringify(params);
		  UM.confirm({
		    title: "确认要离开吗",
		    text: "数据没保存或提交,将不会保存",
		    btnText: ["取消", "确定"],
		    overlay: true,
		    duration:2000,
		    cancle: function() {},
		    ok: function(data) {
			    summer.execScript({
		    	winId: winid,
		    	script: func+'('+params+');'
		    });
		     	summer.closeWin();       
		    }
		}); 
	}
	
	// 日志输出
	r.log = function(msg) {
		if(r.G_DEBUG_MODE) {
			console.log(msg);
		}	
	};
	
	// 注册日期选择器
	r.registerScrollDate = function() {
		$('.scroller-date').scroller('destroy').scroller({
			preset : 'time',
			theme : "ios7",
			mode : "scroller",
			display : "bottom",
			animate : ""
		});
	};
	
	// 注册普通枚举项选择器
	r.registerScrollEnum = function(id) {
		// 枚举变量选择器
		var opt = {
			'select' : {
				preset : 'select'
			}
		};
		$(id).scroller('destroy').scroller($.extend(opt['select'], {
			theme : "ios7",
			mode : "scroller",
			display : "bottom",
			animate : ""
		}));
	};
	
	/* 图片路径存放数组 */
	r.g_path = [];
	/*图片上限*/
	r.g_num = null;
	r.openPhoto = function(photosPath, picNum) {
		 r.g_path = photosPath;
		 r.g_num = picNum;
		 UM.actionsheet({
	        title: '',
	        items: [
	            '拍照', '从相册中选择'
	        ],
	        callbacks: [
	            function () {
	                // 打开相机
	                summer.openCamera({
	                    bindfield: "image",
	                    callback: function (args) {
	                        var path = args.imgPath;
	                        r.compressImg(path);
	                    }
	                });
	            },
	            function () {
	                // 打开相册
	                var count = r.g_num - parseInt(r.g_path.length);
	                summer.openPhotoAlbum({
	                    bindfield: "image",
	                    maxCount: count,
	                    type: "multiple", //支持选多张图片
	                    callback: function (args) {
	                        var paths = args.imgPaths;
	                        for (var i = 0; i < paths.length; i++) {
	                            r.compressImg(paths[i].imgPath);
	                        }
	                    }
	                });
	            }
	        ]
	    });
	};
	
	// 压缩图片
	r.compressImg = function(path) {
		var pathArr = path.split('/');
	    var newPath = pathArr[pathArr.length - 1];
	    // 调用上传
	    summer.compressImg({
	        src: path,
	        path: 'compressImg/camera' + newPath,
	        quality: "0.2", // 质量压缩比例
	        callback: function (arg) {
	            if (r.g_path.length >= r.g_num) {
	                return;
	            }
	            var id = String(r.g_path.length);
	            var picObj = {
	                "path": arg.savepath,
	                "jid": id
	            };
	            r.g_path.push(picObj);
	        }
	    });
	};
	
 	// 预览图片
 	r.goSwiperImg = function(imgArr) {
    	// 预览轮播图
	    var ev = event || window.event;
	    var activeIndex = ev.target.dataset.index;
	    var imgUrlArr = imgArr.map(function (e) {
	        return e.path;
	    });
	    summer.openWin({
	        id: 'PhotosSwiper',
	        url: 'dynamic/html/photosSwiper.html',
	        create: false,
	        animation: {
	            type: "fade",
	            subType: "",
	            duration: 300
	        },
	        pageParam: {
	            activeIndex: activeIndex,
	            imgArr: imgUrlArr,
	            localPath: true
	        }
	    });
	};
	
	/* 删除单张图片 */
	r.closePic = function (obj) {
	    var id = $(obj).siblings().find('img').attr("data-index");
	    for (var i = 0; i < r.g_path.length; i++) {
	        if (r.g_path[i].jid == id) {
	            r.g_path.splice(i, 1);
	            i--;
	        }
	    }
	    $(obj).parent(".conBox").remove();
	    r.g_path.forEach(function (e,i) {
	        e.jid = String(i);
	        $("#plus").siblings(".conBox").eq(i).find('img').attr("data-index", String(i));
	    });
	    $("#plus").removeClass("none");
	};
	
	//涉及到头像处理
    r.thumbOnload = function(ev) {
        var ev = ev || window.event;
        var oImg = ev.target;
        $(oImg).removeAttr('style');
        var w = oImg.naturalWidth;
        var h = oImg.naturalHeight;
        var parentW = $(oImg).parent().width();
        var parentH = $(oImg).parent().height();
        var move;
        if (w >= h) {
            $(oImg).css('height', parentH);
            var actuallyW = parseFloat($(oImg).css('width'));
            move = -(actuallyW - parentW) / 2 + "px";
            $(oImg).css("transform", "translate(" + move + ",0)");
        } else {
            $(oImg).css('width', parentW);
            var actuallyH = parseFloat($(oImg).css('height'));
            move = -(actuallyH - parentH) / 2 + "px";
            $(oImg).css("transform", "translate(0," + move + ")");
        }
        $(oImg).css("display", "block");
    }
    
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
		audioHost.innerHTML = '<audio id="audioCode"><source id="tts_source_id" src="http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=6&pit=7&vol=8&text='+content+'" type="audio/mpeg"><embed id="tts_embed_id" height="0" width="0" src=""></audio>';
		var audioCode = document.getElementById('audioCode');
		audioCode.play();
	};
	
	return r;
})(window, window.roads || {})