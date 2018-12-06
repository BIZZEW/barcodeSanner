/*by zhuhy*/
summerready = function() {
		initPage();
};

//判断是否存在json的key
function objIsEmpty(obj) {
		if (obj != undefined && obj != null && obj != "") {
				return false;
		} else {
				return true;
		}
};
//判断是否为空
function isEmpty(obj) {
		if ( typeof obj == "undefined" || obj == null || obj == "" || obj.trim() == "") {
				return true;
		} else {
				return false;
		}
}

var turn = 0;
function keyBack() {
		turn++;
		if (turn == 2) {
				clearInterval(intervalID);
				summer.exitApp();
		} else {
				summer.toast({
						"msg" : "再点击一次退出应用"
				});
		}
		var intervalID = setInterval(function() {
				clearInterval(intervalID);
				turn = 0;
		}, 3000);
};

var vue = null;

function initPage() {
		// 构造控件Vue实例
		vue = new Vue({
				el : '#index',
				data : {
						//属于哪个部门
						dept : summer.pageParam.dept,
						usrname : summer.pageParam.usrname,
						//dept : "sale",
						deptShowName : "",
						//可用的功能模块
						modules : [],
						timeOutEvent : 0,
						touchStatus : 0,
						pulldownToggle : false
				},
				mounted : function() {
						this.initSlider();
						this.initModules();
				},
				methods : {
						//初始化模块列表
						initModules : function() {
								//根据公司获取信息
								this.modules = this.langFunk(this.dept).moduleList;
								this.deptShowName = this.langFunk(this.dept).showName;
						},
						//初始化轮播
						initSlider : function() {
								var list = [{
										content : "../../img/bg1.jpg"
								}, {
										content : "../../img/bg2.jpg"
								}, {
										content : "../../img/bg3.jpg"
								}, {
										content : "../../img/bg4.jpg"
								}];
								var islider = new iSlider({
										type : 'pic',
										data : list,
										dom : document.getElementById("iSlider-wrapper"),
										isLooping : true,
										animateType : 'default',
										isAutoplay : true,
										animateTime : 800
								});
								//islider.addDot();
						},
						tapHold : function(index) {
								// 这里编辑长按列表项逻辑
								this.touchStatus = 1;
						},
						moveTapHold : function(index) {
								this.touchStatus = 0;
						},
						cancelTapHold : function(index) {
								var item = this.modules[index];
								// 取消长按
								if (this.touchStatus)
										roads.openWin(this.dept, item["module_id"] + "", item["module_id"] + "/" + item["module_id"] + ".html", {
												"dept" : this.dept,
												"module_id" : item["module_id"],
												"module_title" : item["module_title"],
												"record_id" : "-999"
										});
								this.touchStatus = 0;
						},
						exitApp : function(param) {
								UM.confirm({
										title : "确认退出系统",
										text : "之后进入系统需要重新验证登录",
										btnText : ["取消", "确定"],
										overlay : true,
										duration : 2000,
										cancle : function() {
										},
										ok : vue.okCallback
								});
						},
						okCallback : function() {
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
						},
						goSettings : function() {
								roads.openWin("menu", "settings", "settings/settings.html", {
										"dept" : vue.dept,
										"module_id" : vue.module_id
								});
						},
						langFunk : function(strTag) {
								var langCode = isEmpty(summer.getStorage('lang')) ? 1 : summer.getStorage('lang');
								return lang.getStr(langCode, strTag);
						},
						backfrModule : function(param) {
								UM.toast({
										"title" : "操作成功",
										"text" : eval(param)["module_title"] + "表单数据操作成功!",
										"duration" : 3000
								});
						}
				}
		});
}

// reference to last opened menu
var $lastOpened = false;

// simply close the last opened menu on document click
$(document).click(function() {
		if ($lastOpened) {
				$lastOpened.removeClass('open');
		}
});

// simple event delegation
$(document).on('click', '.pulldown-toggle', function(event) {
		// jquery wrap the el
		var el = $('.pulldown-toggle');
		// prevent this from propagating up
		event.preventDefault();
		event.stopPropagation();
		// check for open state
		if (el.hasClass('open')) {
				el.removeClass('open');
		} else {
				if ($lastOpened) {
						$lastOpened.removeClass('open');
				}
				el.addClass('open');
				$lastOpened = el;
		}
});

function refresh() {
		window.location.reload();
};