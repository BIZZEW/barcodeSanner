/*by zhuhy*/
summerready = function() {
		initPage();
}
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
		if ( typeof obj == "undefined" || obj == null || obj == "") {
				return true;
		} else {
				return false;
		}
};

var vue = null;

function initPage() {
		vue = new Vue({
				el : '#index',
				data : {
						baseUrl : "http://172.16.14.212:8088/uapws/service/nc.itf.app.webservice.IPurchaseAppWebService/",
						//0:未登录；1:初始；2:已登录
						loginStatus : 1,
						//1:中文；0:英文
						lang : 1,
						serverShow : false,
						turn : 0,
						dept : "",
						ip : "",
						usrname : "",
						usrcode : "",
						password : "",
						showPD : false,
						remeberPD : 0,
						ipWIndowToggle : false,
						ipLocation : "",
						ipLocationInput : "",
						userList : []
				},
				methods : {
						secretDoor : function(target) {
								this.turn++;
								if (this.turn == target) {
										vue.serverShow = !vue.serverShow;
								}
								var intervalID = setInterval(function() {
										clearInterval(intervalID);
										vue.turn = 0;
								}, 3000);
						},
						//初始化页面
						fillPage : function() {
								var langTmp = summer.getStorage('lang');
								this.lang = isEmpty(langTmp) ? 1 : langTmp;

								var tmp = summer.getStorage('loginStatus');
								this.loginStatus = isEmpty(tmp) ? 0 : tmp;

								var ipStore = summer.getStorage('loginIP');
								if (!isEmpty(ipStore)) {
										this.ipLocation = ipStore;
										this.ipLocationInput = ipStore;
								}

								var remeberPD = summer.getStorage('remeberPD');
								var usrname = summer.getStorage('usrname');
								var usrcode = summer.getStorage('usrcode');
								var password = summer.getStorage('password');
								if (!isEmpty(remeberPD)) {
										this.remeberPD = remeberPD;
										this.usrname = (!isEmpty(usrname)) ? usrname : "";
										this.usrcode = (!isEmpty(usrcode)) ? usrcode : "";
										this.password = (!isEmpty(password)) ? password : "";
								}
						},
						goMenu : function(tag) {
								roads.openWin("scanner", "procureScanner", "procureScanner/procureScanner.html", {
										"dept" : tag,
										"usrname" : this.usrname
								});
						},
						userItemClick : function(index) {
								var item = this.userList[index];
								this.usrname = item.username;
								this.usrcode = item.usercode;
						},
						// 提交表单
						login : function() {
								vue.loginStatus = 1;
								//记住密码逻辑
								summer.setStorage('remeberPD', this.remeberPD);
								if (this.remeberPD) {
										summer.setStorage('usrname', this.usrname);
										summer.setStorage('usrcode', this.usrcode);
										summer.setStorage('password', this.password);
								} else {
										summer.setStorage('usrname', "");
										summer.setStorage('usrcode', "");
										summer.setStorage('password', "");
								}
								var param = {
										"username" : vue.usrcode,
										"password" : vue.password
								};
								var soapXML = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:ipur='http://webservice.app.itf.nc/IPurchaseAppWebService'><soapenv:Header/><soapenv:Body><ipur:login><userinfo>" + JSON.stringify(param) + "</userinfo></ipur:login></soapenv:Body></soapenv:Envelope>";
								roads.oldSkoolAjax(vue.baseUrl + "login", soapXML, function(data) {
										var result = JSON.parse($(data).find("return").html()).status;
										switch(result) {
										case -1:
												UM.toast({
														"title" : "错误提示",
														"text" : "抱歉，该用户不存在!",
														"duration" : 1000
												});
												break;
										case 0:
												UM.toast({
														"title" : "错误提示",
														"text" : "抱歉，查询出现异常!",
														"duration" : 1000
												});
												break;
										case 1:
												roads.vibrator(500);
												UM.toast({
														"title" : "成功提示",
														"text" : "登录成功!",
														"duration" : 1000
												});
												//记录登录状态
												summer.setStorage('loginStatus', result);
												vue.loginStatus = result;
												break;
										case 2:
												UM.toast({
														"title" : "错误提示",
														"text" : "抱歉，用户名或密码错误!",
														"duration" : 1000
												});
												break;
										default:
												break;
										}
								});
						},
						langFunk : function(strTag) {
								return lang.getStr(vue.lang, strTag);
						},
				},
				watch : {
						lang : function(val) {
								summer.setStorage('lang', val);
						},
						loginStatus : function(val) {
								if (val == 1) {
										vue.goMenu("scanner");
								}
						},
						ipLocation : function(val) {
								if (val != "") {
										summer.setStorage('loginIP', val);
										var soapXML = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:ipur='http://webservice.app.itf.nc/IPurchaseAppWebService'><soapenv:Header/><soapenv:Body><ipur:userList><ipaddress>" + val + "</ipaddress></ipur:userList></soapenv:Body></soapenv:Envelope>";
										roads.oldSkoolAjax(vue.baseUrl + "userList", soapXML, function(data) {
												var result = JSON.parse($(data).find("return").html());
												switch(result.status) {
												case -1:
														UM.toast({
																"title" : "错误提示",
																"text" : "抱歉，该服务器下未查询到用户!",
																"duration" : 1000
														});
														vue.userList = [];
														break;
												case 1:
														var userlistraw = result.data;
														vue.userList = eval(userlistraw);
														break;
												case 0:
														UM.toast({
																"title" : "错误提示",
																"text" : "抱歉，查询出现异常!",
																"duration" : 1000
														});
														vue.userList = [];
														break;
												default:
														break;
												}
										});
								}
						}
				},
				mounted : function() {
						// 加载数据...
						this.$nextTick(function() {

						})
				}
		})

		document.addEventListener("deviceready", vue.fillPage(), false);

		var tmax_opts = {
				delay : 0.5,
				repeat : -1,
				repeatDelay : 0.5,
				yoyo : true
		};

		var tmax_tl = new TimelineMax(tmax_opts),
		    polylion_shapes = $('svg.polylion > g polygon'),
		    polylion_stagger = 0.00475,
		    polylion_duration = 1.5;

		var polylion_staggerFrom = {
				scale : 0,
				opacity : 0,
				transformOrigin : 'center center',
		};

		var polylion_staggerTo = {
				opacity : 1,
				scale : 1,
				ease : Elastic.easeInOut
		};

		tmax_tl.staggerFromTo(polylion_shapes, polylion_duration, polylion_staggerFrom, polylion_staggerTo, polylion_stagger, 0);
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
$(document).on('click', '.pen-outer', function(event) {
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
